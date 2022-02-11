// Adapted from the great stuff at https://github.com/theskeletoncrew/treat-toolbox

import Collection from "./collection";
import Project from "./project";
import User from "./user";

interface CandyMachineItem {
  name: string;
  symbol: string;
  description: string;
  seller_fee_basis_points: number;
  external_url: string;
  image: string;
  attributes: TraitValuePair[];
  collection: CollectionItem;
  properties: PropertiesItem;
}

export interface TraitValuePair {
  trait_type: string;
  value: string;
}

interface CollectionItem {
  name: string;
  family: string;
}

interface PropertiesItem {
  category: string;
  files: FileItem[];
  creators: CreatorItem[];
}

interface FileItem {
  uri: string;
  type: string;
}

interface CreatorItem {
  address: string;
  share: number;
}

export namespace CandyMachine {
  export function constructCandyMachineItem({
    itemName,
    itemNumber,
    externalUrl,
    project,
    collection,
    attributes,
    creators
  }: {
    itemName: string,
    itemNumber: number,
    externalUrl: string,
    project: Project,
    collection: Collection,
    attributes: TraitValuePair[],
    creators: User[]
  }): CandyMachineItem {
    const item = {
      name: itemName,
      symbol: collection.symbol,
      description: project.description,
      seller_fee_basis_points: collection.sellerFeeBasisPoints,
      external_url: externalUrl,
      image: itemNumber + ".png",
      attributes: attributes,
      collection: {
        name: collection.name,
        family: project.name,
      } as CollectionItem,
      properties: {
        category: "image",
        files: [
          {
            uri: itemNumber + ".png",
            type: "image/png",
          } as FileItem,
        ],
        creators: creators.map((creator) => {
          return {
            address: creator.address,
            share: creator.share,
          } as CreatorItem;
        }),
      } as PropertiesItem,
    } as CandyMachineItem;

    return item;
  }
}