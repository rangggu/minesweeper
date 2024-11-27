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

// @NOTE : 보드 width, height 개수에 따라 전체 크기 계산
export const getSize = (width: number, height: number) => {
  const w = width > 24 ? 800 : 500
  const h = height > 24 ? 764 : 564
  return { w, h }
}

// @NOTE : 시간 형식 변환
export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = time % 60

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}
