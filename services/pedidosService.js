const sql = require('mssql');
const { connectToDatabase, closeDatabaseConnection } = require('../config/database.js');




/**
 * Obtenemos Pedido para setear el correlativo y tipoDocumento.
 * @param {*} idPedido 
 * @returns 
 */
async function obtenerPedidos(idPedido){
    try {

        await connectToDatabase('Telecontrol');

        const consulta = `SELECT * FROM Telecontrol.dbo.Pedidos where Folio = ${idPedido} `;
        const result = await sql.query(consulta);
        
        await closeDatabaseConnection();
        
        return result.recordset;
    } catch (error) {
        console.error('Error al validar orden de servicio:', error.message);
        throw error;
    }
}


/**
 * Obtenemos Documento parqa enviar a telecontrol
 * @param {*} tipoDocuemnto 
 * @param {*} correlativo 
 * @returns 
 */
async function obtenerDocumento(tipoDocumento , correlativo){
    try {

        await connectToDatabase('DTEBdQMakita');

        const consulta = `Select distinct gf.TipoDocumento, gf.Correlativo, g.Folio, g.Fecha, d.Entidad, d.FolioExterno, c.URL
        from DTEBdQMakita.dbo.documento d
        left join documentodet dt on dt.Empresa=d.empresa and dt.TipoDocumento=d.TipoDocumento and dt.Correlativo=d.Correlativo
        left join documentodet gf on gf.Empresa=dt.Empresa and gf.TipoDocumentoOrigen=dt.TipoDocumento and gf.CorrelativoOrigen=dt.Correlativo
        left join documento g on g.Empresa=gf.Empresa and g.TipoDocumento=gf.TipoDocumento and g.Correlativo=gf.Correlativo
        left join DTEControl c on c.Empresa=g.Empresa and c.TipoDocumento=g.TipoDocumento and c.Correlativo=g.Correlativo
        where d.TipoDocumento= '${tipoDocumento}' and d.folio= '${correlativo}'`;
        
        const result = await sql.query(consulta);
       
        
        await closeDatabaseConnection();
        
        return result.recordset[0];
    } catch (error) {
        console.error('Error al obtener los documentos:', error.message);
        throw error;
    }
}





module.exports = {
    obtenerPedidos , obtenerDocumento
};
