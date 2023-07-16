import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import '@progress/kendo-ui';
import { TemplateStructureClass } from './utils/classes/TemplateStructureClass';

import { DataService } from './services/data.service';
import { DataConnection } from './models/dataConnection.model';
import { findChildNodes } from './utils/functions/findChildrenClass';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('diagram', { static: false }) diagram: any;
  @ViewChild('buttonContainer', { static: true }) buttonContainer: ElementRef;

  riskTemplate: string = '';
  controlTemplate: string = '';
  causeTemplate: string = '';
  consequencesTemplate: string = '';
  otherTemplate: string = '';

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private dataService: DataService
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    sessionStorage.clear();
    let dataConnection = this.dataService.dataConnections;
    let originalData = this.dataService.originalData;
    var tempTitleDetail = '';
    var isExpanded = false;
    var isNodeClicked = false;

    // Import the Drawing API namespaces.
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    //  var Templates = new TemplateStructureClass();

    const toggleExpand = (event: Event) => {
      event.preventDefault();
      const button = document.querySelector('.toggle-button') as HTMLElement; //Select the button element and cast it as an HTML element
      isExpanded = !isExpanded;

      //change the text content of the button
      if (isExpanded) {
        button.innerHTML = 'Normal';
        var diagram = $('#diagram').getKendoDiagram();
        diagram.bringIntoView(diagram.shapes);
        diagram.refresh();
      } else {
        button.innerHTML = 'Expand';
        var diagram = $('#diagram').getKendoDiagram();
        diagram.bringIntoView(diagram.shapes);
        diagram.refresh();
      }

      // Call the change detection manually
      this.cdr.detectChanges();
    };

    function visualTemplate(options: any) {
      console.log(options.dataItem);
      var Templates = new TemplateStructureClass();
      var dataConnection = this.dataConnection;
      // return renderTemplate(Templates , options , isExpanded);

      var dataItem = options.dataItem;
      tempTitleDetail = dataItem.Title;

      //get templates from template class
      var riskTemplate = Templates.GetRiskNodeTemplateGlobal(dataItem);
      var controlTemplate = Templates.GetControlNodeTemplateGlobal(dataItem);
      var causeTemplate = Templates.GetCauseTemplateGlobal(dataItem);
      var consequencesTemplate =
        Templates.GetConsequencesTemplateGlobal(dataItem);
      var bottomTemplate = Templates.GetOtherTemplateGlobal(dataItem);
      var controlTemplateExpand =
        Templates.GetControlNodeTemplateGlobalExpand(dataItem);
      var riskTemplateExpand =
        Templates.GetRiskNodeTemplateGlobalExpand(dataItem);
      var riskActionTemplateExpand =
        Templates.GetRiskActionTreatmentExpand(dataItem);
      var ieTemp = Templates.GetIncidentExpand(dataItem);
      var coeTemp = Templates.GetComplianceObligationExpand(dataItem);
      var keTemp = Templates.GetKPIExpand(dataItem);

      var aeTemp = Templates.GetAuditExpand(dataItem);
      var heTemp = Templates.GetHierarchyExpand(dataItem);
      var aueTemp = Templates.GetAuthorityDocumentExpand(dataItem);
      var peTemp = Templates.GetPolicyExpand(dataItem);
      var areTemp = Templates.GetAuditRecommendationsExpand(dataItem);
      var afeTemp = Templates.GetAuditFinfingExpand(dataItem);

      // templates are assigned to corresponding variables
      sessionStorage.setItem('riskTemplate', riskTemplate);
      sessionStorage.setItem('controlTemplate', controlTemplate);
      sessionStorage.setItem('causeTemplate', causeTemplate);
      sessionStorage.setItem('consequencesTemplate', consequencesTemplate);
      sessionStorage.setItem('otherTemplate', bottomTemplate);
      sessionStorage.setItem('expandTemplate', controlTemplateExpand);
      sessionStorage.setItem('riskExpand', riskTemplateExpand);
      sessionStorage.setItem('riskActionExpand', riskActionTemplateExpand);
      sessionStorage.setItem('incidentExpand', ieTemp);
      sessionStorage.setItem('complianceExpand', coeTemp);
      sessionStorage.setItem('KPIExpand', keTemp);

      var renderElement = $("<div style='display:inline-block' />").appendTo(
        'body'
      );

      if (isExpanded) {
        if (dataItem.Title === 'Risk Node') {
          var riskNodeTemp = kendo.template(riskTemplate);
          renderElement.html(riskNodeTemp(dataItem));
        } else if (dataItem.Title === 'Control Node') {
          var controlNodeExpandTemp = kendo.template(controlTemplateExpand);
          renderElement.html(controlNodeExpandTemp(dataItem));
        } else if (dataItem.Title === 'Consequences Node') {
          var consequencesTemp = kendo.template(consequencesTemplate);
          renderElement.html(consequencesTemp(dataItem));
        } else if (dataItem.Title === 'Cause Node') {
          var causeTemp = kendo.template(causeTemplate);
          renderElement.html(causeTemp(dataItem));
        } else {
          if (dataItem.Header === 'riskExpand') {
            var riskExpandTemp = kendo.template(riskTemplateExpand);
            renderElement.html(riskExpandTemp(dataItem));
          } else if (dataItem.Header === 'riskActionExpand') {
            var riskActionExpandTemp = kendo.template(riskActionTemplateExpand);
            renderElement.html(riskActionExpandTemp(dataItem));
          } else if (dataItem.Header === 'incidentExpand') {
            var incidentExpandTemp = kendo.template(ieTemp);
            renderElement.html(incidentExpandTemp(dataItem));
          } else if (dataItem.Header === 'complianceExpand') {
            var complianceExpandTemp = kendo.template(coeTemp);
            renderElement.html(complianceExpandTemp(dataItem));
          } else if (dataItem.Header === 'KPIExpand') {
            var KPIExpandTemp = kendo.template(keTemp);
            renderElement.html(KPIExpandTemp(dataItem));
          }
        }
      } else {
        if (dataItem.Title === 'Risk Node') {
          var riskNodeTemp = kendo.template(riskTemplate);
          renderElement.html(riskNodeTemp(dataItem));
        } else if (dataItem.Title === 'Control Node') {
          var controlNodeTemp = kendo.template(controlTemplate);
          renderElement.html(controlNodeTemp(dataItem));
        } else if (dataItem.Title === 'Consequences Node') {
          var consequencesTemp = kendo.template(consequencesTemplate);
          renderElement.html(consequencesTemp(dataItem));
        } else if (dataItem.Title === 'Cause Node') {
          var causeTemp = kendo.template(causeTemplate);
          renderElement.html(causeTemp(dataItem));
        } else if (dataItem.Title === 'Expand Node') {
          var extraTemp = kendo.template(controlTemplateExpand);
          renderElement.html(extraTemp(dataItem));
        } else {
          var otherTemp = kendo.template(bottomTemplate);
          renderElement.html(otherTemp(dataItem));
        }
      }

      var output = new kendo.drawing.Group();
      var width = renderElement.width();
      var height = renderElement.height();
      var geom = new kendo.geometry.Rect([0, 0], [width, height]);
      output.append(new kendo.drawing.Rect(geom, { stroke: { width: 0 } }));

      var x = parseInt(dataItem.x);
      var y = parseInt(dataItem.y);

      draw.drawDOM(renderElement, options).then(function (group) {
        output.clear();
        output.append(group);
        renderElement.remove();
      });

      var visual = new kendo.dataviz.diagram.Group();
      visual.drawingElement.append(output);
      return visual;
    }

    //// Create the button element
    const button = this.renderer.createElement('button');
    const buttonText = this.renderer.createText('Expand');
    this.renderer.appendChild(button, buttonText);
    this.renderer.addClass(button, 'toggle-button');

    // Add a click event listener to the button
    this.renderer.listen(button, 'click', toggleExpand);

    // Append the button to the buttonContainer element
    this.renderer.appendChild(this.buttonContainer.nativeElement, button);

    function onEdit(e) {
      /* The result can be observed in the DevTools(F12) console of the browser. */
      //e.container.find(".k-edit-buttons").remove();
    }

    function arrangeNodes(originalData, verticalSpacing) {
      const arrangedNodes = [];

      // Find the risk node (type 1 with ParentNodeId 0)
      const riskNode = originalData.find(
        (node) => node.Type === 1 && node.ParentNodeId === 0
      );

      if (riskNode) {
        const horizontalSpacing = 450;
        // const verticalSpacing = 300;
        const verticalSpacingFour = 200;
        const maxNodesPerRow = 5;
        const maxNodesPerRowFour = 12; // Updated to 12 nodes per row for type 4

        let typeTwoIndex = 0;
        let typeThreeIndex = 0;
        let typeFourIndex = 0;
        let rowIndex = 0;

        const originX = 0;
        const originY = 0;

        // arrange type 2 nodes (left of type 1)
        const typeTwoNodes = originalData.filter((node) => node.Type === 2);

        let typeTwoMaxNode = 4;
        let findControlNodeInFirstPlace = false;
        let findCauseNodeInFirstPlace = false;
        let rowComplete = false;
        let rowNumber = 0;
        let columnNumber = 0;
        let rowNodeCount = 0;

        for (let i = 0; i < typeTwoNodes.length; i++) {
          if (
            typeTwoNodes[i].ParentNodeId == 1 &&
            typeTwoNodes[i].Title == 'Cause Node'
          ) {
            // Calculate the x and y coordinates for the cause node
            const x = originX - 5 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumber * verticalSpacing;

            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
            rowNumber++;
          } else if (typeTwoNodes[i].Title == 'Control Node') {
            const x = originX - (columnNumber + 1) * horizontalSpacing;
            const y = originY + rowNumber * verticalSpacing;
            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
            rowNodeCount++;
            if (rowNodeCount === maxNodesPerRow) {
              rowNumber++;
              rowNodeCount = 0;
            }
            columnNumber = rowNodeCount;
          } else if (
            typeTwoNodes[i].ParentNodeId !== 1 &&
            typeTwoNodes[i].Title == 'Cause Node'
          ) {
            const x = originX - 5 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumber * verticalSpacing;
            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
            rowNodeCount++;

            rowNumber++;
            rowNodeCount = 0;

            columnNumber = rowNodeCount;
          }
        }

        // Arrange type 3 nodes (right of type 1)
        rowNumber = 0;
        const typeThreeNodes = originalData.filter((node) => node.Type === 3);

        for (let i = 0; i < typeThreeNodes.length; i++) {
          if (
            typeThreeNodes[i].ParentNodeId == 1 &&
            typeThreeNodes[i].Title == 'Consequences Node'
          ) {
            const x = originX + 5 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumber * verticalSpacing;
            typeThreeNodes[i].x = x;
            typeThreeNodes[i].y = y;
            arrangedNodes.push(typeThreeNodes[i]);
            rowNumber++;
          } else if (typeThreeNodes[i].Title == 'Control Node') {
            const x = originX + (columnNumber + 1) * horizontalSpacing;
            const y = originY + rowNumber * verticalSpacing;
            typeThreeNodes[i].x = x;
            typeThreeNodes[i].y = y;
            arrangedNodes.push(typeThreeNodes[i]);
            rowNodeCount++;
            if (rowNodeCount === maxNodesPerRow) {
              rowNumber++;
              rowNodeCount = 0;
            }
            columnNumber = rowNodeCount;
          } else if (
            typeThreeNodes[i].ParentNodeId !== 1 &&
            typeThreeNodes[i].Title == 'Consequences Node'
          ) {
            const x = originX + 5 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumber * verticalSpacing;
            typeThreeNodes[i].x = x;
            typeThreeNodes[i].y = y;
            arrangedNodes.push(typeThreeNodes[i]);
            rowNodeCount++;

            rowNumber++;
            rowNodeCount = 0;

            columnNumber = rowNodeCount;
          }
        }

        // Arrange type 1 (risk) node
        const typeTwoRows = Math.ceil(typeTwoNodes.length / maxNodesPerRow);
        const typeThreeRows = Math.ceil(typeThreeNodes.length / maxNodesPerRow);

        let maxTypeTwoTypeThreeRows = Math.max(typeTwoRows, typeThreeRows);

        if (typeTwoRows === typeThreeRows) {
          const riskNodeX = originX;
          const riskNodeY =
            originY +
            (maxTypeTwoTypeThreeRows - 2) * verticalSpacing +
            verticalSpacing / 2; // Adjust the Y-coordinate to place it in the center of the last two rows
          riskNode.x = riskNodeX;
          riskNode.y = riskNodeY;
          arrangedNodes.push(riskNode);
        } else {
          const riskNodeX = originX;
          const riskNodeY = originY + verticalSpacing / 2; // Adjust the Y-coordinate to place it in the center of the last two rows
          riskNode.x = riskNodeX;
          riskNode.y = riskNodeY;
          arrangedNodes.push(riskNode);
        }

        // Arrange type 4 nodes (below type 2 and type 3)
        const typeFourNodes = originalData.filter((node) => node.Type === 4);
        typeFourNodes.forEach((node, index) => {
          const rowNumber = Math.floor(typeFourIndex / maxNodesPerRowFour); // Calculate the row number

          const columnNumber = typeFourIndex % maxNodesPerRowFour; // Calculate the column number

          const x = riskNode.x - (columnNumber - 5) * horizontalSpacing; // Adjusting the starting point for type 4 nodes
          const y =
            riskNode.y +
            rowNumber * verticalSpacingFour +
            (maxTypeTwoTypeThreeRows + 4) * verticalSpacingFour;
          node.x = x;
          node.y = y;
          arrangedNodes.push(node);
          typeFourIndex++;
        });
      }

      return arrangedNodes;
    }

    const arrangedData = arrangeNodes(originalData, 420);

    $(function () {
      $(document).ready(function () {
        createDiagram();
      });

      var detailTemp =
        '<div>' +
        "<h3 class='centre'>Selected Node Details</h3>" +
        "<div class='k-edit-label'>" +
        '<p> Details of the selected node can show here...... </p>' +
        '</div>' +
        '</div> ';

      function onCancel(e) {
        e.preventDefault();
        e.container.closest('.k-popup-edit-form').data('kendoWindow').close();
      }

      function createDiagram() {
        var dataShapes = JSON.parse(sessionStorage.getItem('shapes'));

        if (!dataShapes || dataShapes.length == 0) {
          sessionStorage.setItem('shapes', JSON.stringify(originalData));
          dataShapes = originalData;
        } else {
          dataShapes = JSON.parse(sessionStorage.getItem('shapes'));
        }

        var kendoDiagram = $('#diagram').kendoDiagram({
          dataSource: {
            data: dataShapes,
            schema: {
              model: {
                id: 'id',
                fields: {
                  id: { from: 'Id', type: 'number', editable: false },
                  Type: { type: 'number' },
                  Color: { type: 'string' },
                },
              },
            },
            change: function (ev) {
              var newData = [];
              var dataSourceData = ev.sender.view().toJSON();

              for (var i = 0; i < dataSourceData.length; i++) {
                var item = dataSourceData[i];

                newData.push({
                  Id: item.id,
                  Type: item.Type,
                  Color: item.Color,
                  x: item.x,
                  y: item.y,
                  Title: item.Title,
                });
              }
              sessionStorage.setItem('shapes', JSON.stringify(newData));
            },
          },
          connectionsDataSource: {
            data: dataConnection,
            schema: {
              model: {
                id: 'id',
                fields: {
                  id: { from: 'Id', type: 'number', editable: false },
                  from: { from: 'FromShapeId', type: 'number' },
                  to: { from: 'ToShapeId', type: 'number' },
                  fromX: { from: 'FromPointX', type: 'number' },
                  fromY: { from: 'FromPointY', type: 'number' },
                  toX: { from: 'ToPointX', type: 'number' },
                  toY: { from: 'ToPointY', type: 'number' },
                },
              },
            },
          },

          layout: false,

          edit: onEdit,

          click: onNodeClick,

          shapeDefaults: {
            stroke: {
              color: '#979797',
              width: 10,
            },

            visual: visualTemplate,
          },

          connectionDefaults: {
            stroke: {
              color: '#979797',
              width: 2,
            },
            select: function (e) {
              e.preventDefault(); // Prevent line selection
            },
            content: {
              visible: false, // Hide connection content
            },
          },

          zoom: 0.5,
          cancel: onCancel,
        });

        var diagram = $('#diagram').getKendoDiagram();

        diagram.bringIntoView(diagram.shapes);
        for (var i = 0; i < diagram.shapes.length; i++) {
          diagram.shapes[i].options.stroke.width = 0;
        }
        diagram.refresh();

        // Move the logic that "hides" the templates inside a setTimeout
        setTimeout(() => {
          $(document.body).addClass('hide-control-card-content');
          $(document.body).addClass('hide-cause-card-content');
          $(document.body).addClass('hide-risk-card-content');
          $(document.body).addClass('hide-concequences-card-content');
        }, 2000);
      }
    });

    function onNodeClick(node) {
      isNodeClicked = true;
      console.log(node.item.dataItem.id);
      var selectedNodeId = node.item.dataItem.id;
      console.log('selectedNodeId', selectedNodeId);
      var k = findChildNodes(dataConnection, selectedNodeId);
      console.log('child node->', k);
    }

    var focused = false;
  }

  public nodeClick(data) {
    sessionStorage.clear();
  }
}
