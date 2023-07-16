import { DataConnection } from 'src/app/models/dataConnection.model';

export function findChildNodes(
  dataConnection: DataConnection[],
  selectedNodeId: number
) {
  const childNodes = [];
  const conection = [];

  function findChildren(selectedNodeId: number) {
    for (const connection of dataConnection) {
      if (connection.FromShapeId === selectedNodeId) {
        conection.push(connection);
        childNodes.push(connection.ToShapeId);
        findChildren(connection.ToShapeId);
      }
    }
  }

  findChildren(selectedNodeId);
  return { childnodes: childNodes, dataConnections: conection };
}
