import Image from 'next/image';
import { HolidayBox } from 'styles/Holiday.style';

const HappyHoliday = () => (
  <HolidayBox>
    <Image
      height={200}
      width={200}
      src="/images/holiday-branch.svg"
      alt=""
      style={{ width: '100%', height: 'auto' }}
    />
  </HolidayBox>
);

export default HappyHoliday;
