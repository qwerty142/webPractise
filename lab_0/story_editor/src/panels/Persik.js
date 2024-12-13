import {Button, Panel, PanelHeader, PanelHeaderBack, Placeholder} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import bridge from "@vkontakte/vk-bridge";

export const Persik = ({ id, url, blob }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Persik
      </PanelHeader>
      <Placeholder>
        <img width={230} src={url} alt="Image" />
      </Placeholder>
        <Button stretched size="l" mode="secondary" onClick={() =>
            bridge.send('VKWebAppShowStoryBox', {
                background_type: 'image',
                blob: blob
            }).then((data) => {
                    if (data.result) {
                        console.log(data.result);
                    }
                }).catch((error) => {
                    console.log(error);
            })
        }>
            История
        </Button>
    </Panel>
  );
};

Persik.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  blob: PropTypes.string.isRequired
};
