import React, {Component, useEffect, useState} from 'react';
import cx from "classnames";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import * as icons from "./icons";
import DialogCross from "assets/dialog-cross.svg";
import Profile2 from "assets/profile-2.png";
import Profile3 from "assets/profile-3.png";
import Profile4 from "assets/profile-4.png";
import Profile5 from "assets/profile-5.png";
import Team3 from "assets/team-3.png";
import { UploadDialogTrigger } from "./UploadDialog";


export function NotificationsTarget({notifications, setNotifications} : any) {
  let [referenceElem, setReferenceElem] = useState();
  let [floatingElement, setFloatingElement] = useState();

  let { styles, attributes } = usePopper(referenceElem, floatingElement, {
    placement: "bottom-end"
  });

  return (
    <Popover as={"div"}>
      <Popover.Button
        ref={e => setReferenceElem(e as any)}
        className='box-content cursor-pointer rounded-full p-2 hover:bg-blue-high/10'
      >
        {({ open }) => (
          <>
            <icons.Bell className='hidden desktop:block' />
            {open ? (
              <span className='block rounded-full bg-[#888888]/40 p-1 desktop:hidden'>
                <img src={DialogCross} />
              </span>
            ) : (
              <icons.Bell className='block desktop:hidden' />
            )}
          </>
        )}
      </Popover.Button>
      <Popover.Overlay className='fixed inset-0 hidden bg-black opacity-30 desktop:block' />
      <Popover.Panel
        ref={e => setFloatingElement(e as any)}
        style={styles.popper}
        {...attributes.popper}
        className={cx(
          "d:z-20 d:max-h-[38rem] d:w-[29rem] d:overflow-y-auto d:rounded-card d:bg-grey-low d:p-5",
          "nd:absolute nd:right-0 nd:z-[99] nd:min-h-full nd:w-screen nd:bg-sheet nd:px-7.5 nd:pb-8 nd:pt-6",
          "nd:top-auto nd:bottom-auto nd:left-auto"
        )}
      >
        <NotificationsBox notifications={notifications} setNotifications={setNotifications} />
      </Popover.Panel>
    </Popover>
  );
}

function Notification(
  p: React.PropsWithChildren & {
    profileSrc: string;
    title: React.ReactNode;
    time: string;
  }
) {
  return (
    <section className='flex items-start border-b border-outline-2 pb-5 pt-5 first:pt-0 last:border-0 last:pb-0'>
      <div className='mr-4 overflow-hidden rounded-full'>
        <img className='h-12 w-12 object-cover' src={p.profileSrc} />
      </div>

      <div className='mt-1.5 min-w-0 flex-1'>
        <h2 className='relative pr-4 font-semibold leading-none text-dim-white'>
          {p.title}

          <span className='absolute right-0 top-0.5 block h-2 w-2 rounded-full bg-blue-high'></span>
        </h2>
        <p className='text-sm text-grey-subtle'>{p.time}</p>

        {p.children && <div className='mt-2'>{p.children}</div>}
      </div>
    </section>
  );
}

function EmbeddedNotificationContent(p: React.PropsWithChildren) {
  return (
    <div className='rounded-half border border-outline-2 p-2.5'>
      {p.children}
    </div>
  );
}

function NotificationsBox({notifications, setNotifications} : any) {
  return (
    <>
      <h1 className='mb-5 text-lg font-bold desktop:text-base desktop:font-normal'>
        Notifications ({notifications.length})
      </h1>
      <div>
        <NotificationList notifications={notifications} setNotifications={setNotifications} />
      </div>
    </>
  );
}

function NotificationList({notifications, setNotifications} : any) {
  
  function diffBetweenDatesInSecs(date1: any, date2: any) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / 1000;
  }

  function formatSecsToTime(secs: any) {
    const days = Math.floor(secs / 86400);
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = Math.floor((secs % 3600) % 60);

    // Format to XX Days
    if(days > 0) {
      return days + " Days";
    }

    // Format to XX Hours XX Minutes
    if(hours > 0) {
      return hours + " Hours " + minutes + " Minutes";
    }

    // Format to XX Minutes
    if(minutes > 0) {
      return minutes + " Minutes";
    }

    // Format to XX Seconds
    if(seconds > 0) {
      return seconds + " Seconds";
    }

  }

  function handleAcceptFriendRequest(id) {

      fetch("http://127.0.0.1:7001/acceptFriendRequest", {
              method: "POST",
              crossDomain: true,
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                  token: window.localStorage.getItem("token"),
                  friendId: id,
              }),
          })
          .then((res) => res.json())
          .then((data) => {
              if (data.data == "token expired") {
                  window.localStorage.clear();
                  window.location.href = "../../../login";
              } else {
                  // Remove the notification from the array
                  let newNotifications = notifications.filter((notification) => {
                      return notification.id != id;
                  });
                  setNotifications(newNotifications);
              }
          }
      );

  }

  function handleRejectFriendRequest(id) {
      fetch("http://127.0.0.1:7001/rejectFriendRequest", {
              method: "POST",
              crossDomain: true,
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                  token: window.localStorage.getItem("token"),
                  friendId: id,
              }),
          })
          .then((res) => res.json())
          .then((data) => {
              if (data.data == "token expired") {
                  window.localStorage.clear();
                  window.location.href = "../../../login";
              } else {
                  // Remove the notification from the array
                  let newNotifications = notifications.filter((notification) => {
                      return notification.id != id;
                  });
                  setNotifications(newNotifications);
              }
          }
      );
  }

  function handleAcceptEventInvite(id) {
      fetch("http://127.0.0.1:7001/acceptEventInvite", {
              method: "POST",
              crossDomain: true,
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                  token: window.localStorage.getItem("token"),
                  eventId: id,
              }),
          })
          .then((res) => res.json())
          .then((data) => {
              if (data.data == "token expired") {
                  window.localStorage.clear();
                  window.location.href = "../../../login";
              } else {
                  // Remove the notification from the array
                  let newNotifications = notifications.filter((notification) => {
                      return notification.id != id;
                  });
                  setNotifications(newNotifications);
              }
          }
      );
  }

  function handleRejectEventInvite(id) {
      fetch("http://127.0.0.1:7001/rejectEventInvite", {
              method: "POST",
              crossDomain: true,
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                  token: window.localStorage.getItem("token"),
                  eventId: id,
              }),
          })
          .then((res) => res.json())
          .then((data) => {
              if (data.data == "token expired") {
                  window.localStorage.clear();
                  window.location.href = "../../../login";
              } else {
                  // Remove the notification from the array
                  let newNotifications = notifications.filter((notification) => {
                      return notification.id != id;
                  });
                  setNotifications(newNotifications);
              }
          }
      );
  }


  return (
    <>
    {notifications.length > 0 ? (
        notifications.map((notification, index) => {
            if(notification.type == "friendRequest") {
              return(
                <Notification
                  key={index}
                  title={
                    <>
                      <span className='text-blue-high'>{notification.fname} {notification.lname}</span> wants to be your Friend.
                    </>
                  }
                  profileSrc={Profile3}
                  time={formatSecsToTime(diffBetweenDatesInSecs(new Date(), new Date(notification.requestedAt))) + " ago"}
                >
                  <div className='mt-3 flex gap-x-2.5'>
                    <button onClick={() => handleRejectFriendRequest(notification.id)} className='flex min-w-[7.5rem] items-center justify-center rounded-half bg-grey-high px-1.5 py-1.5 text-white hover:bg-blue-high/10 desktop:px-3'>
                      Decline
                    </button>
                    <button onClick={() => handleAcceptFriendRequest(notification.id)} className='flex min-w-[7.5rem] items-center justify-center rounded-half bg-blue-high px-1.5 py-1.5 text-sheet hover:bg-blue-high/80 desktop:px-3'>
                      Accept
                    </button>
                  </div>
                </Notification>
              )
            } else if(notification.type == "eventInvite"){
              return(
                <Notification
                  key={index}
                  title={
                    <>
                      Event Invite: <span className='text-blue-high'>{notification.name}</span>
                    </>
                  }
                  profileSrc={Profile3}
                  time={notification.startTime + " - " + notification.endTime + " " + notification.date}
                >
                  <div className='mt-3 flex gap-x-2.5'>
                    <button onClick={() => handleRejectEventInvite(notification.id)} className='flex min-w-[7.5rem] items-center justify-center rounded-half bg-grey-high px-1.5 py-1.5 text-white hover:bg-blue-high/10 desktop:px-3'>
                      Decline
                    </button>
                    <button onClick={() => handleAcceptEventInvite(notification.id)} className='flex min-w-[7.5rem] items-center justify-center rounded-half bg-blue-high px-1.5 py-1.5 text-sheet hover:bg-blue-high/80 desktop:px-3'>
                      Accept
                    </button>
                  </div>
                </Notification>
              )

            } else {
                return (
                    <div key={index} className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                        <img src="assets/images/user.png" alt="user" className="w40 position-absolute left-0" />
                        <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">{notification.fname} {notification.lname}<span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> {notification.time}</span></h5>
                        <h6 className="text-grey-500 fw-500 font-xssss lh-4">{notification.message}</h6>
                    </div>
                );
            }

        })
    ) : (
        <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
            <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">No notifications</h5>
        </div>
    )}
      
      {/*<Notification
        title='Event team match ended'
        profileSrc={Profile2}
        time='30 min ago'
      >
        <EmbeddedNotificationContent>
          <div className='flex items-start'>
            <div className='mr-4 overflow-hidden rounded-full'>
              <img className='h-7.5 w-7.5 object-cover' src={Team3} />
            </div>

            <div className='min-w-0 flex-1'>
              <h2 className='mb-1 font-semibold leading-none'>
                League of Champions Tournament
              </h2>
              <p className='text-sm text-grey-subtle'>California community</p>

              <div className='mt-3 flex gap-x-2.5'>
                <button className='flex min-w-[7.5rem] items-center justify-center rounded-half bg-grey-high px-1.5 py-1.5 text-white hover:bg-blue-high/10 desktop:px-3'>
                  Decline
                </button>
                <UploadDialogTrigger>
                  <button className='flex min-w-[7.5rem] items-center justify-center rounded-half bg-blue-high px-1.5 py-1.5 text-sheet hover:bg-blue-high/80 desktop:px-3'>
                    Upload Result
                  </button>
                </UploadDialogTrigger>
              </div>
            </div>
          </div>
        </EmbeddedNotificationContent>
      </Notification>

      <Notification
        title={
          <>
            <span className='text-blue-high'>Robin Sam</span> make a request to
            share match score on your profile
          </>
        }
        profileSrc={Profile3}
        time='30 min ago'
      >
        <div className='mt-3 flex gap-x-2.5'>
          <button className='flex min-w-[7.5rem] items-center justify-center rounded-half bg-grey-high px-1.5 py-1.5 text-white hover:bg-blue-high/10 desktop:px-3'>
            Decline
          </button>
          <button className='flex min-w-[7.5rem] items-center justify-center rounded-half bg-blue-high px-1.5 py-1.5 text-sheet hover:bg-blue-high/80 desktop:px-3'>
            Approve Result
          </button>
        </div>
      </Notification>

      <Notification
        title='Your event would begin in 30 mins, make sure to be at the location on time.'
        profileSrc={Profile4}
        time='30 min ago'
      >
        <EmbeddedNotificationContent>
          <div className='flex items-start'>
            <div className='mr-4 overflow-hidden rounded-full'>
              <img className='h-7.5 w-7.5 object-cover' src={Team3} />
            </div>

            <div className='min-w-0 flex-1'>
              <h2 className='mb-1 font-semibold leading-none'>
                League of Champions Tournament
              </h2>

              <a href='#' className='text-blue-high'>
                View Event
              </a>
            </div>
          </div>
        </EmbeddedNotificationContent>
      </Notification>

      <Notification
        title={
          <>
            <span className='text-blue-high'>Robin Sam</span> make a request to
            share match score on your profile
          </>
        }
        profileSrc={Profile5}
        time='30 min ago'
      >
        <div className='mt-3 flex gap-x-2.5'>
          <button className='flex min-w-[7.5rem] items-center justify-center rounded-half bg-grey-high px-1.5 py-1.5 text-white hover:bg-blue-high/10 desktop:px-3'>
            Decline
          </button>
          <button className='flex min-w-[7.5rem] items-center justify-center rounded-half bg-blue-high px-1.5 py-1.5 text-sheet hover:bg-blue-high/80 desktop:px-3'>
            Approve Result
          </button>
        </div>
      </Notification>

      <Notification
        title='Event team match ended'
        profileSrc={Profile2}
        time='30 min ago'
      >
        <EmbeddedNotificationContent>
          <div className='flex items-start'>
            <div className='mr-4 overflow-hidden rounded-full'>
              <img className='h-7.5 w-7.5 object-cover' src={Team3} />
            </div>

            <div className='min-w-0 flex-1'>
              <h2 className='mb-1 font-semibold leading-none'>
                League of Champions Tournament
              </h2>
              <p className='text-sm text-grey-subtle'>California community</p>

              <div className='mt-3 flex gap-x-2.5'>
                <button className='flex min-w-[7.5rem] items-center justify-center rounded-half bg-grey-high px-1.5 py-1.5 text-white hover:bg-blue-high/10 desktop:px-3'>
                  Decline
                </button>
                <button className='flex min-w-[7.5rem] items-center justify-center rounded-half bg-blue-high px-1.5 py-1.5 text-sheet hover:bg-blue-high/80 desktop:px-3'>
                  Upload Result
                </button>
              </div>
            </div>
          </div>
        </EmbeddedNotificationContent>
      </Notification>

      */}
    </>
  );
}
