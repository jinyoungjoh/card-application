import { getCards } from '@/remote/card'
import ListRow from '@common/ListRow'
import { css } from '@emotion/react'
import { flatten } from 'lodash'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery } from 'react-query'

function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      return getCards(pageParam)
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
    },
  )

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
    <div css={Wrapper}>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold={'100px'}
      >
        {cards.map((card, index) => {
          return (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={card.payback !== null ? <div>{card.payback}</div> : null}
              withArrow
            />
          )
        })}
      </InfiniteScroll>
    </div>
  )
}

const Wrapper = css`
  min-height: 100vh;
  margin-bottom: 26px;
`

export default CardList
