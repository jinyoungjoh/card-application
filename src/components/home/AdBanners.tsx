import { getAdBanners } from '@/remote/adBanner'
import { colors } from '@/styles/colorPalette'
import Flex from '@common/Flex'
import Text from '@common/Text'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

function AdBanners() {
  const { data, isLoading } = useQuery(['adBanners'], () => getAdBanners(), {
    refetchOnWindowFocus: false, // 포커스 변경 시 재호출 비활성화
  })

  // 레이아웃 쉬프트 방지용
  if (data == null || isLoading) {
    return (
      <Container>
        <Flex direction="column" css={[bannerContainerStyles, skeletionStyle]}>
          <Text bold />
          <Text typography="t7"></Text>
        </Flex>
      </Container>
    )
  }

  return (
    <Container>
      <Swiper
        spaceBetween={8}
        modules={[Pagination]}
        pagination={{ clickable: true }}
      >
        {data?.map((banner, index) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <Flex direction="column" css={bannerContainerStyles}>
                  <Text bold>{banner.title}</Text>
                  <Text typography="t7">{banner.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

const bannerContainerStyles = css`
  padding: 19px 20px 30px 20px;
  background-color: ${colors.grey};
  border-radius: 4px;
`

const skeletionStyle = css`
  height: 45px;
`

export default AdBanners
