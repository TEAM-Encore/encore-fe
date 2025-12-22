import { type Href, router } from 'expo-router'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { cn } from '@/utils/cn'

export interface MypageSectionItem {
  label: string
  value?: string
  href?: Href
  onPress?: () => void
}

interface MypageSectionProps {
  title?: string
  items: MypageSectionItem[]
}

function MypageSection({ title, items }: MypageSectionProps) {
  return (
    <Col gap={12}>
      {title && (
        <Text variant="subhead-02" color="gray-06" className="px-2">
          {title}
        </Text>
      )}
      <Col className="w-full rounded-[10px] bg-gray-11">
        {items.map((sectionItem, index) => (
          <Row
            key={sectionItem.label}
            align="center"
            justify="space-between"
            className={cn(
              'px-5 py-[13px]',
              index !== items.length - 1 ? 'border-gray-09 border-b' : '',
            )}
            onPress={() => {
              if (sectionItem.href) {
                router.push(sectionItem.href)
              } else if (sectionItem.onPress) {
                sectionItem.onPress()
              } else {
                return
              }
            }}
          >
            <Row gap={10} align="center">
              <Text
                variant="body-long-02"
                color="gray-01"
                className="font-medium"
              >
                {sectionItem.label}
              </Text>
              {title === '외부 링크' && (
                <Icon
                  name="ExternalLink"
                  size={18.5}
                  className="text-gray-01"
                />
              )}
            </Row>
            {title === '내 계정' && (
              <Icon
                name="ArrowLeft"
                size={24}
                className="rotate-180 text-gray-01"
              />
            )}
            {sectionItem.value && (
              <Text className="text-[#888] text-[14px] leading-7">
                {sectionItem.value}
              </Text>
            )}
          </Row>
        ))}
      </Col>
    </Col>
  )
}

export default MypageSection
