import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

// @Note : 배열 생성 함수
export const createArray = (length: number, value: any) => {
  return Array(length).fill(value)
}

// @Note : 2D 배열 생성 함수
export const createArray2D = (width: number, height: number, initialValue: any): any[][] => {
  const array: any[][] = []
  for (let i = 0; i < height; i++) {
    array.push(new Array(width).fill(initialValue))
  }
  return array
}

// @Note : 한 셀의 크기 계산 함수
export const calculateCellSize = (
  containerWidth: number,
  containerHeight: number,
  row: number,
  col: number,
): number => {
  const maxCellWidth = containerWidth / col
  const maxCellHeight = containerHeight / row

  return Math.floor(Math.min(maxCellWidth, maxCellHeight))
}
