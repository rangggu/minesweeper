import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

// @NOTE : 배열 생성 함수
export const createArray = (length: number, value: any) => {
  return Array(length).fill(value)
}

// @NOTE : 2D 배열 생성 함수
export const createArray2D = (width: number, height: number, initialValue: any): any[][] => {
  const array: any[][] = []
  for (let i = 0; i < height; i++) {
    array.push(new Array(width).fill(initialValue))
  }
  return array
}

// @NOTE : 한 셀의 크기 계산 함수
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

// @NOTE : 한 자리 숫자일 경우 앞에 0을 추가하고 반환
export const padSingleDigit = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`
}
