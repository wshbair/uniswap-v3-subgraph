import {
  Approval,
  ApprovalForAll,
  Collect,
  DecreaseLiquidity,
  IncreaseLiquidity,
  Transfer,
} from '../../generated/NFTPositionsManager/NFTPositionsManager';
import { Position } from '../../generated/schema';
import { FACTORY_ADDRESS, ZERO_BI, ONE_BI, ZERO_BD, ADDRESS_ZERO } from './../utils/constants'
export function handleIncreaseLiquidity(event: IncreaseLiquidity): void {
  let entity = Position.load(event.params.tokenId.toHex());
  if (entity == null) {
    entity = new Position(event.params.tokenId.toHex());
    entity.approved = null;
    entity.tokenId = event.params.tokenId;
    entity.owner = event.transaction.from;
    entity.staked = false;
    entity.oldOwner = null;
    entity.liquidity = ZERO_BI;
  }
  entity.liquidity = entity.liquidity.plus(event.params.liquidity)
  entity.save();
}


export function handleDecreaseLiquidity(event: DecreaseLiquidity): void {
  let entity =  Position.load(event.params.tokenId.toHex());
  // position was not able to be fetched
  if (entity == null) {
    return
  }
  entity.liquidity = entity.liquidity.minus(event.params.liquidity);
  entity.save();
}

export function handleTransfer(event: Transfer): void {
  let entity = Position.load(event.params.tokenId.toHex());
  if (entity != null) {
    entity.oldOwner = event.params.from;
    entity.owner = event.params.to;
    entity.approved = null;
    entity.save();
  }
}

export function handleApproval(event: Approval): void {
  let entity = Position.load(event.params.tokenId.toHex());
  if (entity != null) {
    entity.approved = event.params.approved;
    entity.save();
  }
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleCollect(event: Collect): void {}
