import * as React from "react";
import { DiagramEngine } from "../DiagramEngine";
import { NodeModel } from "../models/NodeModel";
import { BaseWidget, BaseWidgetProps } from "./BaseWidget";

export interface NodeProps extends BaseWidgetProps {
	node: NodeModel;
	children?: any;
	diagramEngine: DiagramEngine;
}

export interface NodeState {}

/**
 * @author Dylan Vorster
 */
export class NodeWidget extends BaseWidget<NodeProps, NodeState> {
	constructor(props: NodeProps) {
		super("srd-node", props);
		this.state = {};
	}

	shouldComponentUpdate(nextProps) {
		const node = this.props.node as any;
		if (node.draw) {
			return true;
		}
		return this.props.diagramEngine.canEntityRepaint(this.props.node);
	}

	componentDidUpdate() {
		const node = this.props.node as any;
		if (node.draw) {
			node.stopDraw();
		}
	}

	getClassName() {
		return (
			"node " +
			super.getClassName() +
			(this.props.node.isSelected() ? this.bem("--selected") : "")
		);
	}

	render() {
		return (
			<div
				{...this.getProps()}
				data-nodeid={this.props.node.id}
				style={{
					top: this.props.node.y,
					left: this.props.node.x,
				}}
			>
				{this.props.children}
			</div>
		);
	}
}
