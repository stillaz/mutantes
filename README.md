# mutantes
Buscador de mutantes

# Introducción
Esta es una API donde se envía un array de dna, el cual válida si el array podría ser, un mutante.

Esta API se ejecuta en NodeJS, por medio de un Contendor Docker, usando despliegue continuo con Google Cloud Build, en el momento de hacer push en la rama master del repositorio GIT, este automáticamente construye el contenedor con los cambios nuevos de la versión de este proyecto.

# Clonar proyecto e instalar modules
git clone https://github.com/stillaz/mutantes.git

En linea de comandos en el directorio donde se encuentra el proyecto ejecutar: npm i

# Ejecución Local
En linea de comandos en el directorio donde se encuentra el proyecto ejecutar: node index.js
Al ejecutar vemos en la linea de comandos: "Node server running on port 3000"

# Despliegue en GOOGLE CLOUD BUILD
Hacer commit, y push en el branch master...

# Ejecutar API MUTANT
curl -X POST {url}/mutant -H 'Content-Type: application/json' -d '{dnaArray}'

# Ejecutar API STATS
curl -X GET {url}/stats -H 'Content-Type: application/json'

# DNA Example
dnaArray = ["TGACAT", "GTCTTT", "GGATCA", "CCATCG", "AACCAA", "AGCCGC"]

# URL API
LOCALHOST
url = localhost:3000

GOOGLE CLOUD RUN
url = https://mutant-gocsdilcia-uc.a.run.app