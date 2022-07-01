import { BigInt, Address, crypto, ethereum } from '@graphprotocol/graph-ts'

export function getIncentiveId(rewardToken: Address, pool: Address, startTime: BigInt, endTime: BigInt, refundee: Address): string {
    let incentiveKeyParams: Array<ethereum.Value> = [
        ethereum.Value.fromAddress(rewardToken),
        ethereum.Value.fromAddress(pool),
        ethereum.Value.fromUnsignedBigInt(startTime),
        ethereum.Value.fromUnsignedBigInt(endTime),
        ethereum.Value.fromAddress(refundee)
    ]

    let incentiveKey = changetype<ethereum.Tuple>(incentiveKeyParams);
    let encoded = ethereum.encode(ethereum.Value.fromTuple(incentiveKey))!

    let incentiveId = crypto.keccak256(encoded).toHexString()

    return incentiveId
}