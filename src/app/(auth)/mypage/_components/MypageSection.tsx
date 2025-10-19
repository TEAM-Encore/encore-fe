import { Icon } from '@/components/common/icons/Icon';
import { Col, Row } from '@/components/common/ui/Flex';
import { Text } from '@/components/common/ui/Text';
import { router, Href } from 'expo-router';

export interface MypageSectionItem {
  label: string;
  value?: string;
  href?: Href;
  onPress?: () => void;
}

interface MypageSectionProps {
  title?: string;
  items: MypageSectionItem[];
}

export function MypageSection({ title, items }: MypageSectionProps) {
  return (
    <Col gap={12}>
      {title && (
        <Text
          variant='subhead-02'
          color='gray-06'
          className='px-2'
        >
          {title}
        </Text>
      )}
      <Col className='rounded-[10px] bg-gray-11 w-full'>
        {items.map((sectionItem, index) => (
          <Row
            key={sectionItem.label}
            align='center'
            justify='space-between'
            className={`px-5 py-[13px] ${index !== items.length - 1 ? 'border-b border-gray-09' : ''}`}
            onPress={() => {
              if (sectionItem.href) {
                router.push(sectionItem.href!);
              } else if (sectionItem.onPress) {
                sectionItem.onPress();
              } else {
                return;
              }
            }}
          >
            <Row
              gap={10}
              align='center'
            >
              <Text
                variant='body-long-02'
                color='gray-01'
                className='font-medium'
              >
                {sectionItem.label}
              </Text>
              {title === '외부 링크' && (
                <Icon
                  name='ExternalLink'
                  size={18.5}
                  color='#FBFBFB'
                />
              )}
            </Row>
            {title === '내 계정' && (
              <Icon
                name='ArrowLeft'
                size={24}
                color='#FBFBFB'
                className='rotate-180'
              />
            )}
            {sectionItem.value && (
              <Text className='text-[14px] leading-7 text-[#888]'>{sectionItem.value}</Text>
            )}
          </Row>
        ))}
      </Col>
    </Col>
  );
}
