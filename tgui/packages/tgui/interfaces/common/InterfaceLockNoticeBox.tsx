import { BooleanLike } from 'common/react';

import { useBackend } from '../../backend';
import { Button, Flex, NoticeBox } from '../../components';

type Data = {
  siliconUser: BooleanLike;
  locked: BooleanLike;
  preventLocking: BooleanLike;
};

/**
 * This component by expects the following fields to be returned
 * from ui_data:
 *
 * - siliconUser: boolean
 * - locked: boolean
 *
 * And expects the following ui_act action to be implemented:
 *
 * - lock - for toggling the lock as a silicon user.
 *
 * All props can be redefined if you want custom behavior, but
 * it's preferred to stick to defaults.
 */
export const InterfaceLockNoticeBox = (props) => {
  const { act, data } = useBackend<Data>();
  const {
    siliconUser = data.siliconUser,
    locked = data.locked,
    onLockStatusChange = () => act('lock'),
    accessText = 'an ID card',
    preventLocking = data.preventLocking,
  } = props;
  // For silicon users
  if (siliconUser) {
    return (
      <NoticeBox color="grey">
        <Flex align="center">
          <Flex.Item>Interface lock status:</Flex.Item>
          <Flex.Item grow={1} />
          <Flex.Item>
            <Button
              m={0}
              color={locked ? 'red' : 'green'}
              icon={locked ? 'lock' : 'unlock'}
              disabled={preventLocking}
              onClick={() => {
                if (onLockStatusChange) {
                  onLockStatusChange(!locked);
                }
              }}
            >
              {locked ? 'Locked' : 'Unlocked'}
            </Button>
          </Flex.Item>
        </Flex>
      </NoticeBox>
    );
  }
  // For everyone else
  return (
    <NoticeBox>
      Swipe {accessText} to {locked ? 'unlock' : 'lock'} this interface.
    </NoticeBox>
  );
};
