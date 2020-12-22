import { ID, Ent, Viewer, loadEnt } from "../core/ent";

interface Node {
  id: ID;
}

export interface NodeResolver {
  encode(node: Node): string;
  decode(id: string): ID | null;
  decodeObj(viewer: Viewer, id: string): Promise<Node | null>;
}

// generated loadEntByType signature....
interface loadEnt {
  (v: Viewer, nodeType: string, id: ID): Promise<Ent | null>;
}

export class EntNodeResolver implements NodeResolver {
  constructor(private loader: loadEnt) {}

  encode(node: Ent): string {
    // let's do 3 parts. we take the "node" prefix
    const str = `node:${node.nodeType}:${node.id}`;
    return Buffer.from(str, "ascii").toString("base64");
  }

  decode(id: string): ID | null {
    const decoded = Buffer.from(id, "base64").toString("ascii");
    let parts = decoded.split(":");
    if (parts.length != 3) {
      return null;
    }
    return parts[2];
  }

  mustDecode(id: string): ID {
    const decoded = this.decode(id);
    if (!decoded) {
      throw new Error(`invalid id ${id} passed to EntNodeResolver`);
    }
    return decoded;
  }

  async decodeObj(viewer: Viewer, id: string): Promise<Node | null> {
    const decoded = Buffer.from(id, "base64").toString("ascii");
    let parts = decoded.split(":");
    if (parts.length != 3 || parts[0] != "node") {
      return null;
    }
    return this.loader(viewer, parts[1], parts[2]);
  }
}

let resolvers: Map<string, NodeResolver> = new Map();
export async function registerResolver(name: string, resolver: NodeResolver) {
  resolvers.set(name, resolver);
}

export async function clearResolvers() {
  resolvers.clear();
}

export async function resolveID(
  viewer: Viewer,
  id: string,
): Promise<Node | null> {
  for (const [_, resolver] of resolvers) {
    const node = await resolver.decodeObj(viewer, id);
    if (node !== null) {
      return node;
    }
  }
  return null;
}
