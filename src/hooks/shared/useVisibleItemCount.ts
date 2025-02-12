import { useEffect, useMemo, useState } from 'react'

/**
 * 현재 뷰포트 높이를 기반으로 표시할 아이템 개수를 계산하는 훅
 * @param rowHeight 각 아이템의 높이 (기본값: 60px)
 * @param extraRows 추가로 불러올 아이템 개수 (기본값: 0)
 * @param listRef 리스트 컨테이너의 ref (기본값: null)
 * @returns 화면에 표시할 아이템 개수
 */
export function useVisibleItemCount(
  rowHeight: number = 60,
  extraRows: number = 0,
  listRef: React.RefObject<HTMLElement> = { current: null }, // listRef 추가
): number {
  const [viewportHeight, setViewportHeight] = useState<number>(
    window.innerHeight,
  )
  const [listOffsetTop, setListOffsetTop] = useState<number>(0) // 리스트의 offsetTop 값 추가

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight)
      if (listRef.current) {
        setListOffsetTop(listRef.current.getBoundingClientRect().top)
      }
    }

    window.addEventListener('resize', handleResize)
    if (listRef.current) {
      setListOffsetTop(listRef.current.getBoundingClientRect().top)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [listRef])

  const visibleItemCount = useMemo(() => {
    // viewport에서 리스트의 시작 위치를 제외하고 계산
    const adjustedHeight = viewportHeight - listOffsetTop
    const count = Math.ceil(adjustedHeight / rowHeight) + extraRows
    console.log('[useVisibleItemCount] 계산된 아이템 개수:', count)
    return count
  }, [viewportHeight, rowHeight, extraRows, listOffsetTop])

  return visibleItemCount
}
