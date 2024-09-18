import { useState, useEffect } from 'react';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Persik, Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

async function fetchBlob(url) {
  const response = await fetch(url);
  return response.blob();
}

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const [imageSourceUrl, setImageSourceUrl] = useState("");
  const [imageSourceBlob, setImageSourceBlob] = useState("");


  useEffect(() => {
    async function fetchData() {
      setPopout(null);
      const image = await fetchBlob("https://random.imagecdn.app/540/1200");
      setImageSourceUrl(URL.createObjectURL(image));
      var reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = (e) => {
        var data = e.target.result;
        console.log(data);
        setImageSourceBlob(data)
      }
    }
    fetchData();
  }, []);

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home"/>
          <Persik id="some_image" url={imageSourceUrl} blob={imageSourceBlob} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
