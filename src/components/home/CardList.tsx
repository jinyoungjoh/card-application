import { getCards } from '@/remote/card'
import ListRow from '@common/ListRow'
import { css } from '@emotion/react'
import flatten from 'lodash.flatten'
import { useCallback, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery } from 'react-query'
import Badge from '../common/Badge'
import { useNavigate } from 'react-router-dom'
import { useVisibleItemCount } from '@hooks/shared/useVisibleItemCount'

function CardList() {
  const listRef = useRef<HTMLDivElement>(null)
  const itemCount = useVisibleItemCount(68, 3, listRef)

  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards', itemCount],
    ({ pageParam }) => {
      return getCards(pageParam, itemCount)
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
      suspense: true,
      refetchOnWindowFocus: false, // 포커스 변경 시 재호출 비활성화
    },
  )

  const navigate = useNavigate()

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  if (data == null) {
    return null
  }

  const cards = flatten(data?.pages.map(({ items }) => items))

  return (
    <div ref={listRef} css={Wrapper}>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        next={loadMore}
        scrollThreshold={'100px'}
      >
        <ul>
          {cards.map((card, index) => {
            return (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.Texts
                    title={`${index + 1}위`}
                    subTitle={card.name}
                  />
                }
                right={card.payback ? <Badge label={card.payback} /> : null}
                withArrow
                onClick={() => {
                  navigate(`/card/${card.id}`)
                }}
                highlight
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

const Wrapper = css`
  min-height: 100vh;
  margin-bottom: 26px;
`

export default CardList
