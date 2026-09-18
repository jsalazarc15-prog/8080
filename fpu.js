 // Javier Adolfo Salazar Carias
  // carne:0900-22-1009
class CoprocesadorFlotante {
    constructor() {
        // Memoria independiente para cada operando
        this.bufferA = new ArrayBuffer(4);
        this.viewA = new DataView(this.bufferA);
        this.floatA = new Float32Array(this.bufferA);

        this.bufferB = new ArrayBuffer(4);
        this.viewB = new DataView(this.bufferB);
        this.floatB = new Float32Array(this.bufferB);

        this.bufferRes = new ArrayBuffer(4);
        this.viewRes = new DataView(this.bufferRes);
        this.floatRes = new Float32Array(this.bufferRes);

        this.resultado = 0;
    }

    // Ahora guarda el byte guiandose por el puerto exacto
    escribirByte(puerto, valor) {
        if (puerto >= 16 && puerto <= 19) { // Puertos 0x10 a 0x13
            this.viewA.setUint8(puerto - 16, valor);
        } else if (puerto >= 20 && puerto <= 23) { // Puertos 0x14 a 0x17
            this.viewB.setUint8(puerto - 20, valor);
        }
        this.actualizarUI(); // Actualiza la pantalla en cada paso
    }

    ejecutarOperacion(codigoOp) {
        let a = this.floatA[0];
        let b = this.floatB[0];
        
        switch(codigoOp) {
            case 1: this.resultado = a + b; break;
            case 2: this.resultado = a - b; break;
            case 3: this.resultado = a * b; break;
            case 4: this.resultado = (b !== 0) ? a / b : 0; break;
            default: this.resultado = 0;
        }
        
        this.floatRes[0] = this.resultado;
        this.actualizarUI();
    }

    leerByteResultado(indice) {
        return this.viewRes.getUint8(indice);
    }

    actualizarUI() {
        const panel = document.getElementById('panel-fpu');
        if(panel) {
            panel.innerHTML = `
                <span style="color: #4fc3f7; font-weight: bold;">Op A:</span> <span style="color: #e0e0e0;">${this.floatA[0].toFixed(4)}</span> <br>
                <span style="color: #4fc3f7; font-weight: bold;">Op B:</span> <span style="color: #e0e0e0;">${this.floatB[0].toFixed(4)}</span> <br>
                <span style="color: #fff176; font-weight: bold;">Resultado:</span> <span style="color: white; font-weight: bold;">${this.resultado.toFixed(4)}</span>
            `;
        }
    }
}
const fpu = new CoprocesadorFlotante();