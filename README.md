# Análisis para Ecommerce SOREUS - CAPSTONE PROJECT

Este proyecto aplica modelos de pronóstico (ARIMA, Regresión Lineal Múltiple y Random Forest) sobre datos reales de ventas de la empresa SOREUS MOTORS.

## 🔍 Objetivos
- Predecir ventas mensuales del año 2025
- Evaluar el desempeño de modelos estadísticos y de machine learning
- Generar visualizaciones y conclusiones útiles para la toma de decisiones

## 🛠️ Modelos Utilizados
- 📈 ARIMA
- 📊 Regresión Lineal Múltiple (RLM)
- 🌲 Random Forest

## 📁 Estructura del proyecto
- `notebooks/`: Contiene el desarrollo en Jupyter Notebook
- `data/`: Datos procesados y exportados
- `img/`: Gráficos y visualizaciones

## 🧠 Conclusiones
- El modelo que mejor desempeño tuvo fue _________ con un R² de _____ y menor RMSE.
- Se recomienda enfocarse en los meses con mayor tendencia y ajustar promociones trimestrales.
## 📦 Requisitos
- Python 3.x
- Jupyter Notebook
- pandas, numpy, matplotlib, scikit-learn, statsmodels

## 📤 Exportar MongoDB
Para exportar la base de datos:
```bash
mongodump --db tienda --out "E:\SOREUS - CAPSTOM PROJECT"
