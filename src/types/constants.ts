export const enum STATUS {
  READY = "ready",
  RUN = "run",
  SUCCESS = "success",
  GAMEOVER = "gameover",
}

export const enum CELL_STATE {
  EMPTY = 0, // 빈 칸
  NUMBER = 1, // 숫자
  MINE = 2, // 지뢰
  FLAGGED_MINE = 3, // 지뢰인 곳에 깃발
  FLAGGED_NON_MINE = 4, // 지뢰가 아닌 곳에 깃발
  OPENED_MINE = 5, // 열린 지뢰
  OPENED_NUMBER = 6, // 열린 숫자
  OPENED_EMPTY = 7, // 열린 빈 칸
}
