export const enum STATUS {
  READY = "ready",
  RUN = "run",
  SUCCESS = "success",
  GAMEOVER = "gameover",
}

export const enum CELL_STATE {
  EMPTY = 0, // 숨겨진 상태 (사용자가 아직 클릭하지 않은 상태)
  NUMBER = 1, // 숫자가 적혀 있는 상태 (주변 지뢰의 개수)
  MINE = 2, // 지뢰가 있는 상태
  FLAGGED_MINE = 3, // 지뢰가 있는 칸에 깃발이 꽂혀 있는 상태
  FLAGGED_NON_MINE = 4, // 지뢰가 아닌 곳에 깃발이 꽂혀 있는 상태
  OPENED_MINE = 5, // 지뢰가 있는 칸이 열려서 게임 오버 상태
  OPENED_NUMBER = 6, // 숫자가 적혀 있는 칸이 열린 상태
  OPENED_EMPTY = 7, // 빈 칸이 열린 상태 (주변에 지뢰가 없어서 열렸을 때)
}
