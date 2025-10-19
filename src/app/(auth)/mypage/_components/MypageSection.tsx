import { Icon } from '@/components/common/icons/Icon';
import { Col, Row } from '@/components/common/ui/Flex';
import { Text } from '@/components/common/ui/Text';

interface MypageSectionProps {
  title: string;
	items: { label: string; href: string }[];
	version?: string;
}

export function MypageSection({ title, items, version }: MypageSectionProps) {
  return (
    <Col gap={12}>
      <Text
        variant='subhead-02'
        color='gray-06'
        className='px-2'
      >
        {title}
      </Text>
      <Col className='rounded-[10px] bg-gray-11 w-full'>
        {items.map((account, index) => (
          <Row
            key={account.label}
            align='center'
            justify='space-between'
            className={`px-5 py-[13px] ${index !== items.length - 1 ? 'border-b border-gray-09' : ''}`}
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
                {account.label}
              </Text>
              {title === '외부 링크' && <Icon
                name='ExternalLink'
                size={18.5}
                color='#FBFBFB'
              />}
            </Row>
            {title === '내 계정' && <Icon
              name='ArrowLeft'
              size={24}
              color='#FBFBFB'
              className='rotate-180'
						/>}
						{title === '앱 정보' && <Text className="text-[14px] leading-7 text-[#888]">{ version}</Text>}
          </Row>
        ))}
      </Col>
    </Col>
  );
}
