
export class DiagramManager {
  constructor() {}



public updateConnectionColors(connections) {
    var connColor;
      
  enum ConnectionColor {
    Red = "red",
    Green = "green",
    LightBlue = "yellow",
    DarkBlue = "orange",
    Default = "#979797"
}
    for (var idx = 0; idx < connections.length; idx++) {
        if (connections[idx] instanceof kendo.dataviz.diagram.Connection) {
            switch (connections[idx].dataItem.color) {
                case "1":
                    connColor = ConnectionColor.Red;
                    break;
                case "2":
                    connColor = ConnectionColor.Green;
                    break;
                case "3":
                    connColor = ConnectionColor.LightBlue;
                    break;
                case "4":
                    connColor = ConnectionColor.DarkBlue;
                    break;
                default:
                    connColor = ConnectionColor.Default;
            }
            connections[idx].redraw({
                stroke: {
                    color: connColor
                }
            });
        }
    }
}

public handlePan(e, diagram) {
  // Record the starting mouse position for panning
  if (!diagram.panStart) {
      diagram.panStart = { x: e.origin.x, y: e.origin.y };
  }

  // Calculate the difference in mouse position and pan the diagram
  var panX = e.origin.x - diagram.panStart.x;
  var panY = e.origin.y - diagram.panStart.y;
  diagram.pan(panX, panY);

  // Update the starting mouse position for the next pan event
  diagram.panStart = { x: e.origin.x, y: e.origin.y };
}


// public updateDiagramDimensions(diagram) {
//   // Calculate the available screen width and height
//   var screenWidth = $(window).width();
//   var screenHeight = $(window).height();

//   // Calculate a reasonable diagram size based on screen dimensions
//   var diagramWidth = Math.min(screenWidth); // Adjust the 100 as needed
//   var diagramHeight = Math.min(screenHeight + 100); // Adjust the 100 as needed

//   // Update the diagram's dimensions
//   diagram.wrapper.width(diagramWidth);
//   diagram.wrapper.height(diagramHeight);
//   diagram.resize();
// }

public onNodeClick(e , clicked:boolean , diagram , dataArrayoriginal ) {

     
  if (e.item.dataItem.Header == "Control" || e.item.dataItem.Header == "Compliance" || e.item.dataItem.Header == "Authority Document") {
    var clickedNodeId = e.item.dataItem.id;
    clicked = true;
    
    var dataArray = diagram.dataSource.data();
    var linkedNodesToClickedNode = [];


    var reloadButton = document.getElementById("btReload");
    if (clicked) {
      reloadButton.style.display = "flex"; // Show the button
    } else {
      reloadButton.style.display = "none"; // Hide the button
    }

    //create linkedNodesToClickedNode array to recreate the datasource
    if (clicked) {

      //push clicked node to the array 
      linkedNodesToClickedNode.push(e.item.dataItem);
      for (var i = 0; i < dataArray.length; i++) {
        var node = dataArray[i];
        var nodes = dataArrayoriginal[i];

        // push nodes that are linked to clicked node
        if (Array.isArray(nodes.LinkedControlIds) && nodes.LinkedControlIds.includes(clickedNodeId) || nodes.Header == "Risk") {
          linkedNodesToClickedNode.push(node);
        }
      }
    }

    //update node placing
    const originX = 0;
    const originY = 0;
    const horizontalSpacing = 720;
    let riskRowNumber = 0;
    let riskColumnNumber = 1;
    let causeConsequenceColumnNumber = 0;
    let otherNodesColumnNumber = 0;
    let verticalSpacing = 520;
    var centralizedRiskNodes = []
    e.item.dataItem.x = 0;
    e.item.dataItem.y = 0;
    for (let i = 1; i < linkedNodesToClickedNode.length; i++) {


      if (linkedNodesToClickedNode[i].Header == "Risk") {
        linkedNodesToClickedNode[i].x = originX + riskColumnNumber * horizontalSpacing;
        linkedNodesToClickedNode[i].y = originY - riskRowNumber * verticalSpacing;
        riskColumnNumber++;
        centralizedRiskNodes.push(linkedNodesToClickedNode[i]);
        // console.log(centralizedRiskNodes);
        var riskArrayLength = centralizedRiskNodes.length - 1;
      }

      //causes and consequences placed left bottom to the clicked node
      else if (linkedNodesToClickedNode[i].Header == "Cause" || linkedNodesToClickedNode[i].Header == "Consequence") {
        let causeConsequenceRowNumber = centralizedRiskNodes[riskArrayLength].y + 1;

        //risk place left to clicked node
        linkedNodesToClickedNode[i].x = originX - causeConsequenceColumnNumber * horizontalSpacing;
        linkedNodesToClickedNode[i].y = originY + causeConsequenceRowNumber * verticalSpacing;
        causeConsequenceColumnNumber++;
        if (causeConsequenceColumnNumber > 4) {
          causeConsequenceRowNumber++;
        }

        // console.log(causeConsequenceRowNumber);

      }
      //all other nodes that linked to control placed right bottom of the clicked node
      else {
        let otherNodesRowNumber = centralizedRiskNodes[riskArrayLength].y + 1;
        linkedNodesToClickedNode[i].x = originX + otherNodesColumnNumber * horizontalSpacing;
        linkedNodesToClickedNode[i].y = originY + otherNodesRowNumber * verticalSpacing;
        otherNodesColumnNumber++;
        if (otherNodesColumnNumber > 4) {
          otherNodesRowNumber++;
        }

      }

      if (riskColumnNumber > 4) {
        riskRowNumber++;
      }



    }
    // console.log(linkedNodesToClickedNode);

    //rectreate the connection source
    var connectionsDataSource = {
      data: []
    };

    for (let i = 1; i < linkedNodesToClickedNode.length; i++) {
      var conObj = {

        from: linkedNodesToClickedNode[0].id.toString(), // Convert to string
        to: linkedNodesToClickedNode[i].id.toString()    // Convert to string
      };

      connectionsDataSource.data.push(conObj);
    }



    // ReSet the data source and connections data source
    e.sender.setDataSource(linkedNodesToClickedNode);
    e.sender.setConnectionsDataSource(connectionsDataSource);


    diagram.refresh();

  }
  
  return linkedNodesToClickedNode;
}

}