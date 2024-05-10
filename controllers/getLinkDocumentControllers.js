const { obtenerPedidos, obtenerDocumento } = require('../services/pedidosService.js');
const mock = require('../config/mock.js');


async function getLinkDocument(req, res) {
    try {
        const idPedido = req.params.idPedido;
        let tipoDocumento;
        let correlativo;
        let data;

        const response = await obtenerPedidos(idPedido);
        if(response.length > 0){
           const dataDocumento = response[0];
           
           tipoDocumento = dataDocumento.TipoDocumento;
           correlativo = dataDocumento.Correlativo;
           
            const responseDocumento = await obtenerDocumento(tipoDocumento , correlativo);
            
            if(responseDocumento.Correlativo != null){

                data =  {
                    pedido : responseDocumento.FolioExterno,
                    entidad : responseDocumento.Entidad,
                    correlativo : responseDocumento.Correlativo,
                    url : responseDocumento.URL
            }
            
                res.status(200).json(data);
           
            }else{
                res.status(404).json({mensaje : `No se encontro documento para el correlativo ${correlativo}`});
            }
        
        }else{
            res.status(404).json({mensaje : `No se encontro el pedido ${idPedido}`});
        }
      
    } catch (error) {
        console.error('Error al obtener los documentos [getLinkDocumentControllers]:', error.message);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}


module.exports = {
    getLinkDocument
};
