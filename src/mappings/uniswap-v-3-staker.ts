import { ethereum, crypto ,BigInt, log, Address, json, ByteArray, ValueKind } from "@graphprotocol/graph-ts"
import {
  UniswapV3Staker,
  DepositTransferred,
  IncentiveCreated,
  IncentiveEnded,
  RewardClaimed,
  TokenStaked,
  TokenUnstaked
} from "../../generated/UniswapV3Staker/UniswapV3Staker";
import { Incentive, Position } from '../../generated/schema';

import {getIncentiveId} from '../utils/incentive';
export function handleIncentiveCreated(event: IncentiveCreated): void {
    
  let incentiveId = getIncentiveId(event.params.rewardToken, 
                                   event.params.pool,
                                   event.params.startTime,
                                   event.params.endTime, 
                                   event.params.refundee);
  let entity = new Incentive(incentiveId);

  entity.pool = event.params.pool
  entity.rewardToken = event.params.rewardToken
  entity.refundee = event.params.refundee
  entity.ended = false
  entity.startTime = event.params.startTime
  entity.endTime = event.params.endTime
  entity.reward = event.params.reward
  entity.save()
  //log.warning("INCENTIVEID: {} ::::::::: {}", ["HELPPPPPPPPP======>>>>>>>>>>", "nothing"]); 
}

export function handleIncentiveEnded(event: IncentiveEnded): void {
  let entity = Incentive.load(event.params.incentiveId.toHex());
  if (entity != null) {
    entity.ended = true;
    entity.save();
  }
}

export function handleRewardClaimed(event: RewardClaimed): void {}

export function handleTokenStaked(event: TokenStaked): void {
  let entity = Position.load(event.params.tokenId.toHex());
  if (entity != null) {
    entity.staked = true;
    entity.liquidity = event.params.liquidity;
    entity.incentiveId = event.params.incentiveId;
    entity.save();
  }
}

export function handleTokenUnstaked(event: TokenUnstaked): void {
  let entity = Position.load(event.params.tokenId.toHex());
  if (entity != null) {
    entity.staked = false;
    entity.incentiveId = null;
    entity.save();
  }
}

export function handleDepositTransferred(event: DepositTransferred): void {
  let entity = Position.load(event.params.tokenId.toHex());
  if (entity != null) {
    entity.oldOwner = event.params.oldOwner;
    entity.owner = event.params.newOwner;
    entity.save();
  }
}