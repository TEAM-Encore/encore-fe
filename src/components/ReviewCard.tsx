import { Icon } from '@/components/common/icons/Icon'
import { Col, Flex, Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { cn } from '@/utils/cn'
import React from 'react'
import { Image, View } from 'react-native'

type ReviewCardProps = {
    title: string
    summary: string
    author: string
    likes: number
    posterUrl: string
    onPress?: () => void
    className?: string
    active?: boolean
}

export function ReviewCard({
    title, summary, author, likes, posterUrl, onPress, className, active = false,
}: ReviewCardProps) {
    return (
        <Flex
            direction="row"
            onPress={onPress}
            className={cn(
                'w-full h-[126px] py-[17px] px-[16px] rounded-[8px] bg-gray-11 flex-row',
                {
                    'bg-gray-03': active,
                    'bg-gray-11': !active,
                },
                className,
            )}
        >
            {/* 포스터 */}
            <View className="w-[66px] h-[92px] rounded-[12px] overflow-hidden bg-white/5">
                {posterUrl ? <Image source={posterUrl} className="w-full h-full" resizeMode="cover" /> : null}
            </View>

            {/* 리뷰 정보 */}
            <Col className="flex-1 ml-[16px]">
                {/* 제목 */}
                <Text variant="subhead-03" className={cn(active ? 'text-gray-12' : 'text-gray-01')} numberOfLines={1}>
                    {title}
                </Text>

                {/* 요약 */}
                <Text
                    variant="body-01"
                    className={cn('text-gray-07', 'mt-[6px]')}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {summary}
                </Text>

                {/* 작성자, like Count */}
                <Row className="items-center gap-x-[8px] mt-[8px]">
                    <Row className="items-center gap-x-[4px]">
                        <Icon name="User" size={12} className={cn({
                            'text-gray-10': active,
                            'text-gray-01': !active,
                        })} />
                        <Text variant="caption" className={cn({
                            'text-gray-10': active,
                            'text-gray-01': !active,
                        },)} numberOfLines={1}>
                            {author}
                        </Text>
                    </Row>

                    <Row className="items-center gap-x-[4px]">

                        <Icon name="Like" size={12} className={cn({
                            'text-gray-10': active,
                            'text-gray-01': !active,
                        })} />
                        <Text variant="caption" className={cn({
                            'text-gray-10': active,
                            'text-gray-01': !active,
                        })}>
                            {likes}
                        </Text>
                    </Row>
                </Row>
            </Col>
        </Flex>
    )
}
