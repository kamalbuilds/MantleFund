import { useEffect, useState, useContext, useCallback } from 'react';
// import { Section } from '../src/components/styled';
import * as PushAPI from '@pushprotocol/restapi';
import { Web3Context } from '../context/web3Context';
import { EnvContext } from '../context/envContext';
import { NotificationItem, chainNameType, SubscribedModal } from '@pushprotocol/uiweb';
import { getCAIPAddress } from '../../src/components/helpers';
import { Button } from 'react-bootstrap';
import { Section } from '@mantine/core/lib/AppShell/HorizontalSection/Section/Section';
import '../components/notifications.css';

const NotificationsTest = () => {
  const { account, chainId } = useContext<any>(Web3Context);
  const { env, isCAIP } = useContext<any>(EnvContext);
  const [isLoading, setLoading] = useState(false);
  const [notifs, setNotifs] = useState<PushAPI.ParsedResponseType[]>();
  const [spams, setSpams] = useState<PushAPI.ParsedResponseType[]>();
  const [theme, setTheme] = useState('dark');
  const [viewType, setViewType] = useState('notif');
  const [showSubscribe, setShowSubscribe] = useState(false);


  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const feeds = await PushAPI.user.getFeeds({
        user: isCAIP ? getCAIPAddress(env, account) : account,
        // user: isCAIP ? getCAIPAddress(env, devWorkingAddress) : devWorkingAddress,
        limit: 30,
        env
      });

      console.log('feeds: ', feeds);

      setNotifs(feeds);

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [account, env, isCAIP]);

  const loadSpam = useCallback(async () => {
    try {
      setLoading(true);
      const spamks = await PushAPI.user.getFeeds({
        user: isCAIP ? getCAIPAddress(env, account) : account,
        spam: true,
        env
      });

      setSpams(spamks);
  
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [account, env, isCAIP]);


  const toggleSubscribedModal = () => {
    setShowSubscribe((lastVal) => !lastVal);
  };


  useEffect(() => {
    if (account) {
      if (viewType === 'notif') {
        loadNotifications();
      } else {
        loadSpam();
      }
    }
  }, [account, viewType, loadNotifications, loadSpam]);

  return (
      <div>
            
            <h2>Here are all the Notifications</h2>
            
                    
            <div className='TabButtons'>
                <Button onClick={() => { setViewType('notif') }}>Notifications</Button>
                <Button onClick={() => { setViewType('spam') }}>Spam</Button>
                <Button onClick={toggleSubscribedModal}>show subscribed modal</Button>
            </div>

            

            {showSubscribe ? <SubscribedModal onClose={toggleSubscribedModal}/> : null}

            <div className='Section'>
            {viewType === 'notif' ? (
                <>
                <b className='headerText'>Notifications: </b>
                <div className='SectionItem' >
                {notifs ? (
                    <div className='NotificationListContainer'>
                    {notifs.map((oneNotification, i) => {
    
                    const { 
                        cta,
                        title,
                        message,
                        app,
                        icon,
                        image,
                        url,
                        blockchain,
                        secret,
                        notification
                    } = oneNotification;

                    // const chainName = blockchain as chainNameType;

                    return (
                        <NotificationItem
                        key={`notif-${i}`}
                        notificationTitle={secret ? notification['title'] : title}
                        notificationBody={secret ? notification['body'] : message}
                        cta={cta}
                        app={app}
                        icon={icon}
                        image={image}
                        url={url}
                        theme={theme}
                        // chainName="ETH_TEST_KOVAN"
                        chainName={blockchain as chainNameType}
                        />
                    );
                    })}
                    </div>
                ) : null}
                </div>
                </>

            ) : (
                <>
                <b className='headerText'>Spams: </b>
                <div className='SectionItem' >
                {spams ? (
                    <div className='NotificationListContainer'>
                    {spams.map((oneNotification, i) => {
                    const { 
                        cta,
                        title,
                        message,
                        app,
                        icon,
                        image,
                        url,
                        blockchain,
                        secret,
                        notification
                    } = oneNotification;

                    return (
                        <NotificationItem
                        key={`spam-${i}`}
                        notificationTitle={secret ? notification['title'] : title}
                        notificationBody={secret ? notification['body'] : message}
                        cta={cta}
                        app={app}
                        icon={icon}
                        image={image}
                        url={url}
                        // optional parameters for rendering spambox
                        isSpam
                        subscribeFn={async () => console.log("yayy spam")}
                        isSubscribedFn={async () => false}
                        theme={theme}
                        chainName={blockchain as chainNameType}
                        />
                    );
                    })}
                    </div>
                ) : null}
                </div>
                </>

            )}
            </div>

     
      </div>
  );
}

export default NotificationsTest;