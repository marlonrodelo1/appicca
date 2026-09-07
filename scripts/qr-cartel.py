"""
Genera el cartel con código QR de donación (mismo diseño que el de
"Diezmo y ofrenda"): logo ICC arriba en verde oliva, título, y el QR
con la paloma de Remar en el centro.

Uso:
    python scripts/qr-cartel.py
    python scripts/qr-cartel.py --url https://... --titulo "Diezmo y ofrenda"
    python scripts/qr-cartel.py --con-url        # añade la URL escrita debajo

Salida en qr/ : PNG a 300 ppp (A4), PDF listo para imprenta y el QR suelto.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image, ImageDraw, ImageFilter, ImageFont

RAIZ = Path(__file__).resolve().parent.parent
SALIDA = RAIZ / "qr"

# --- Ajustes de marca -------------------------------------------------------
OLIVA = (85, 107, 30)          # verde oliva del cartel original
BLANCO = (255, 255, 255)
LOGO_ICC = RAIZ / "public" / "logo.png"
LOGO_REMAR = RAIZ / "public" / "fotos" / "remar-logo-hd.png"
FUENTE = Path("C:/Windows/Fonts/calibrib.ttf")   # Calibri Bold

# --- Lienzo A4 a 300 ppp ----------------------------------------------------
A4 = (2480, 3508)
PPP = 300
ANCHO_LOGO = 830         # ancho del logo ICC
CUERPO_TITULO = 132      # tamaño del texto del título
ANCHO_QR = 1800          # lado del QR (sin contar el margen blanco)
MARGEN_MODULOS = 4       # zona de silencio obligatoria alrededor del código
HUECO_LOGO_QR = 0.28     # lado del recuadro central, como fracción del QR


def logo_icc_oliva(ancho: int) -> Image.Image:
    """El logo original es blanco sobre azul. Lo pasamos a oliva sobre blanco
    usando la luminancia como máscara (así se conservan los bordes suaves)."""
    src = Image.open(LOGO_ICC).convert("RGB")
    # El PNG trae un marco de 1 px más claro (artefacto de compresión) que si no
    # se quita aparece como una raya de oliva y estropea el recorte.
    src = src.crop((2, 2, src.width - 2, src.height - 2))
    lum = src.convert("L")

    # El fondo azul ronda L=100 y el trazo blanco L=255: normalizamos entre ambos.
    mascara = lum.point(lambda v: 0 if v <= 112 else min(255, int((v - 112) * 255 / 143)))

    tinta = Image.new("RGB", src.size, OLIVA)
    fondo = Image.new("RGB", src.size, BLANCO)
    compuesto = Image.composite(tinta, fondo, mascara)

    # Recortamos el aire sobrante alrededor del trazo.
    caja = mascara.getbbox()
    if caja:
        compuesto = compuesto.crop(caja)
        mascara = mascara.crop(caja)

    alto = round(ancho * compuesto.height / compuesto.width)
    compuesto = compuesto.resize((ancho, alto), Image.LANCZOS)
    mascara = mascara.resize((ancho, alto), Image.LANCZOS)

    salida = Image.new("RGBA", (ancho, alto), (0, 0, 0, 0))
    salida.paste(compuesto, (0, 0), mascara)
    return salida


def paloma_remar(lado: int) -> Image.Image:
    """Paloma de Remar teñida de oliva, para el centro del QR.

    El logo de origen es pequeño y con el borde escalonado, así que se vuelve
    a suavizar antes de ampliarlo: se agranda, se difumina y se endurece el
    borde otra vez. Sin esto la paloma sale borrosa o dentada al imprimir.
    """
    alfa = Image.open(LOGO_REMAR).convert("RGBA").split()[3]
    caja = alfa.getbbox()
    if caja:
        alfa = alfa.crop(caja)

    grande = alfa.resize((alfa.width * 3, alfa.height * 3), Image.LANCZOS)
    grande = grande.filter(ImageFilter.GaussianBlur(4))
    grande = grande.point(lambda v: min(255, max(0, round((v - 96) * 255 / 64))))

    escala = lado / max(grande.width, grande.height)
    tam = (max(1, round(grande.width * escala)), max(1, round(grande.height * escala)))
    alfa = grande.resize(tam, Image.LANCZOS)

    tenido = Image.new("RGBA", tam, (0, 0, 0, 0))
    tenido.paste(Image.new("RGBA", tam, OLIVA + (255,)), (0, 0), alfa)
    return tenido


def construir_qr(url: str, lado: int) -> tuple[Image.Image, int, int]:
    """Devuelve (imagen, píxeles por módulo, margen en píxeles).

    Corrección de errores H (30 %): es lo que permite tapar el centro con la
    paloma sin que el código deje de leerse. El margen de 4 módulos (zona de
    silencio) es obligatorio: sin él los lectores no encuentran el código.
    """
    qr = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=1, border=MARGEN_MODULOS)
    qr.add_data(url)
    qr.make(fit=True)
    matriz = qr.get_matrix()          # ya incluye el margen
    n_total = len(matriz)
    n_codigo = n_total - 2 * MARGEN_MODULOS

    px = max(1, lado // n_codigo)     # píxeles por módulo, entero => bordes nítidos
    real = px * n_total

    img = Image.new("RGB", (real, real), BLANCO)
    lienzo = ImageDraw.Draw(img)
    for y, fila in enumerate(matriz):
        for x, oscuro in enumerate(fila):
            if oscuro:
                lienzo.rectangle(
                    [x * px, y * px, (x + 1) * px - 1, (y + 1) * px - 1],
                    fill=OLIVA,
                )
    return img, px, MARGEN_MODULOS * px


def qr_con_paloma(url: str, lado: int, hueco_frac: float = HUECO_LOGO_QR) -> Image.Image:
    img, px, margen = construir_qr(url, lado)
    real = img.width
    codigo = real - 2 * margen

    hueco = int(codigo * hueco_frac)
    hueco -= hueco % px                      # cuadra el recuadro con la rejilla
    x0 = (real - hueco) // 2
    x0 -= (x0 - margen) % px

    ImageDraw.Draw(img).rectangle([x0, x0, x0 + hueco - 1, x0 + hueco - 1], fill=BLANCO)

    paloma = paloma_remar(int(hueco * 0.80))
    img.paste(
        paloma,
        (x0 + (hueco - paloma.width) // 2, x0 + (hueco - paloma.height) // 2),
        paloma,
    )
    return img


def verificar(img: Image.Image, esperado: str, etiqueta: str) -> None:
    """Comprueba que el QR se lee de verdad: no basta con generarlo.

    Se prueba a tamaño completo y reducido a 500 px, que es lo que ve la
    cámara de un móvil escaneando el cartel desde lejos.
    """
    import numpy as np
    import cv2

    detector = cv2.QRCodeDetector()
    for prueba, muestra in (
        ("original", img),
        ("reducido a 500 px", img.resize((500, round(500 * img.height / img.width)))),
    ):
        gris = cv2.cvtColor(np.array(muestra.convert("RGB")), cv2.COLOR_RGB2GRAY)
        leido, *_ = detector.detectAndDecode(gris)
        if leido != esperado:
            raise SystemExit(
                f"ERROR: {etiqueta} no se lee ({prueba}).\n"
                f"  esperado: {esperado}\n  leído:    {leido or '(nada)'}"
            )


def componer(url: str, titulo: str, con_url: bool) -> Image.Image:
    hoja = Image.new("RGB", A4, BLANCO)
    dibujo = ImageDraw.Draw(hoja)

    logo = logo_icc_oliva(ANCHO_LOGO)
    qr = qr_con_paloma(url, ANCHO_QR)
    fuente = ImageFont.truetype(str(FUENTE), CUERPO_TITULO)

    _, arriba, _, abajo = dibujo.textbbox((0, 0), titulo, font=fuente)
    alto_titulo = abajo - arriba

    fuente_url = ImageFont.truetype(str(FUENTE), 52)
    alto_url = 0
    if con_url:
        _, u0, _, u1 = dibujo.textbbox((0, 0), url, font=fuente_url)
        alto_url = (u1 - u0) + 90

    hueco_1 = 150   # logo -> título
    hueco_2 = 210   # título -> QR

    bloque = logo.height + hueco_1 + alto_titulo + hueco_2 + qr.height + alto_url
    y = (A4[1] - bloque) // 2

    hoja.paste(logo, ((A4[0] - logo.width) // 2, y), logo)
    y += logo.height + hueco_1

    dibujo.text((A4[0] // 2, y - arriba), titulo, font=fuente, fill=OLIVA, anchor="ma")
    y += alto_titulo + hueco_2

    hoja.paste(qr, ((A4[0] - qr.width) // 2, y))
    y += qr.height

    if con_url:
        dibujo.text(
            (A4[0] // 2, y + 90), url, font=fuente_url, fill=OLIVA, anchor="ma"
        )

    return hoja


def main() -> None:
    p = argparse.ArgumentParser(description="Cartel con QR de donación")
    p.add_argument(
        "--url",
        default="https://cuerpodecristoacentejo.com/todos-por-ucrania/donar",
    )
    p.add_argument("--titulo", default="Todos con Ucrania")
    p.add_argument("--nombre", default="qr-todos-con-ucrania")
    p.add_argument(
        "--con-url",
        action="store_true",
        help="escribe la URL debajo del QR (por si la cámara falla)",
    )
    args = p.parse_args()

    SALIDA.mkdir(exist_ok=True)

    suelto = qr_con_paloma(args.url, ANCHO_QR)
    verificar(suelto, args.url, "el código suelto")

    hoja = componer(args.url, args.titulo, args.con_url)
    verificar(hoja, args.url, "el cartel")

    png = SALIDA / f"{args.nombre}.png"
    pdf = SALIDA / f"{args.nombre}.pdf"
    solo = SALIDA / f"{args.nombre}-solo-codigo.png"

    hoja.save(png, dpi=(PPP, PPP))
    hoja.save(pdf, "PDF", resolution=PPP)
    suelto.save(solo, dpi=(PPP, PPP))

    print(f"URL     : {args.url}")
    print(f"Título  : {args.titulo}")
    print("Lectura : OK (verificado con OpenCV)")
    for f in (png, pdf, solo):
        print(f"  {f.relative_to(RAIZ)}  ({f.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
