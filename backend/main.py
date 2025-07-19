from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import os
import json

app = FastAPI()

# CORS para permitir solicitudes desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5179"],  # Añade más si cambias de puerto
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API Tradetech activa"}

@app.get("/products")
def get_products():
    return [
        {"id": 1, "name": "Cilantro", "country": "México", "status": "Disponible"},
        {"id": 2, "name": "Mango Ataulfo", "country": "Colombia", "status": "En tránsito"},
        {"id": 3, "name": "Limón Persa", "country": "Brasil", "status": "Exportado"},
    ]

@app.post("/mercado")
async def consultar_mercado(request: Request):
    try:
        body = await request.json()
        modo = body.get("modo")
        origen = body.get("origen")
        destino = body.get("destino")
        producto = body.get("producto")

        if not all([modo, origen, destino, producto]):
            return JSONResponse(status_code=422, content={"error": "Faltan datos en la solicitud"})

        return {
            "producto": producto,
            "origen": origen,
            "destino": destino,
            "volumen": "125,000 toneladas",
            "valor": "240",
            "periodo": "2014-2024",
            "historial": [
                {"año": 2014, "valor": 120},
                {"año": 2015, "valor": 130},
                {"año": 2016, "valor": 140},
                {"año": 2017, "valor": 150},
                {"año": 2018, "valor": 160},
                {"año": 2019, "valor": 170},
                {"año": 2020, "valor": 180},
                {"año": 2021, "valor": 200},
                {"año": 2022, "valor": 220},
                {"año": 2023, "valor": 230},
                {"año": 2024, "valor": 240},
            ],
            "ranking_destino": 1,
            "mensaje": f"{destino} es el principal comprador de {producto} de {origen}."
        }

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
