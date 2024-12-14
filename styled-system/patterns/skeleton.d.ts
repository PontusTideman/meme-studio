/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index';
import type { Properties } from '../types/csstype';
import type { SystemProperties } from '../types/style-props';
import type { DistributiveOmit } from '../types/system-types';
import type { Tokens } from '../tokens/index';

export interface SkeletonProperties {
   
}


interface SkeletonStyles extends SkeletonProperties, DistributiveOmit<SystemStyleObject, keyof SkeletonProperties > {}

interface SkeletonPatternFn {
  (styles?: SkeletonStyles): string
  raw: (styles?: SkeletonStyles) => SystemStyleObject
}


export declare const skeleton: SkeletonPatternFn;
