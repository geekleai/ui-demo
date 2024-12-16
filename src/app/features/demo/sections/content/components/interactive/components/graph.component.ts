import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, OnInit, viewChild } from "@angular/core";

import { Data, DataSet, Network } from "vis-network/standalone";

@Component({
  selector: "component-interactive-graph",
  imports: [],
  templateUrl: "./graph.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InteractiveGraphComponent implements OnInit {
  protected readonly networkContainer = viewChild<ElementRef>("networkContainer");
  protected readonly fullscreenContainer = viewChild<ElementRef>("fullscreenContainer");
  protected readonly graphContainer = viewChild<ElementRef>("graphContainer");

  protected isFullscreen = false;
  private _network: Network | null = null;
  private readonly _cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.drawNetwork();
  }

  drawNetwork(): void {
    const nodes = new DataSet([
      { id: 1, label: "Core Module", group: "1" },
      { id: 2, label: "Auth Module", group: "1" },
      { id: 3, label: "User Module", group: "2" },
      { id: 4, label: "Dashboard Module", group: "2" },
      { id: 5, label: "Settings Module", group: "3" },
      { id: 6, label: "Analytics Module", group: "3" },
      { id: 7, label: "Reporting Module", group: "4" },
      { id: 8, label: "Notification Module", group: "4" },
      { id: 9, label: "API Module", group: "5" },
      { id: 10, label: "Database Module", group: "5" }
    ]);

    const edgesConnectionColor = "#7e7f81";
    const edges = new DataSet([
      { id: 1, from: 1, to: 2, color: edgesConnectionColor},
      { id: 2, from: 1, to: 3, color: edgesConnectionColor },
      { id: 3, from: 1, to: 4, color: edgesConnectionColor },
      { id: 4, from: 2, to: 3, color: edgesConnectionColor },
      { id: 5, from: 3, to: 4, color: edgesConnectionColor },
      { id: 6, from: 3, to: 5, color: edgesConnectionColor },
      { id: 7, from: 4, to: 6, color: edgesConnectionColor },
      { id: 8, from: 4, to: 7, color: edgesConnectionColor },
      { id: 9, from: 5, to: 8, color: edgesConnectionColor },
      { id: 10, from: 6, to: 7, color: edgesConnectionColor },
      { id: 11, from: 7, to: 8, color: edgesConnectionColor },
      { id: 12, from: 9, to: 1, color: edgesConnectionColor },
      { id: 13, from: 9, to: 2, color: edgesConnectionColor },
      { id: 14, from: 9, to: 3, color: edgesConnectionColor },
      { id: 15, from: 9, to: 4, color: edgesConnectionColor },
      { id: 16, from: 10, to: 9, color: edgesConnectionColor }
    ]);

    const data: Data = {
      nodes: nodes.get(),
      edges: edges.get()
    };

    const groupColor = "#999";
    const options = {
      nodes: {
        shape: "dot",
        size: 16
      },
      groups: {
        1: { color: { background: groupColor } },
        2: { color: { background: groupColor } },
        3: { color: { background: groupColor } },
        4: { color: { background: groupColor } },
        5: { color: { background: groupColor } }
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18
        },
        maxVelocity: 146,
        solver: "forceAtlas2Based",
        timestep: 0.35,
        stabilization: { iterations: 150 }
      }
    };

    const container = this.graphContainer()!.nativeElement;
    this._network = new Network(container, data, options);
  }

  expandToFullscreen(): void {
    this.isFullscreen = true;
    this._cdr.detectChanges(); // Ensure the fullscreen container is rendered
    setTimeout(() => {
      const fullscreenElement = this.fullscreenContainer()!.nativeElement;
      const graphElement = this.graphContainer()!.nativeElement;
      fullscreenElement.appendChild(graphElement);
      if (this._network) {
        this._network.setSize("80%", "100%");
        this._network.redraw();
        // Give some time for the DOM to update before fitting
        setTimeout(() => {
          this._network!.fit({
            animation: {
              duration: 1000,
              easingFunction: "easeInOutQuad"
            }
          });
        }, 100);
      }
    }, 0);
  }

  closeFullscreen(): void {
    this.isFullscreen = false;
    const networkElement = this.networkContainer()!.nativeElement;
    const graphElement = this.graphContainer()!.nativeElement;
    networkElement.appendChild(graphElement);
    if (this._network) {
      this._network.setSize("100%", "100%");
      this._network.redraw();
      // Give some time for the DOM to update before fitting
      setTimeout(() => {
        this._network!.fit({
          animation: {
            duration: 1000,
            easingFunction: "easeInOutQuad"
          }
        });
      }, 100);
    }
    this._cdr.detectChanges();
  }

}
