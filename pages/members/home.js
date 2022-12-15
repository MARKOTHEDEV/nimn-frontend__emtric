
import { Grid, Typography, Button } from "@mui/material"
import { AccountBalanceWalletRounded } from "@mui/icons-material";
// import Image from "next/image";
// import NewsImage from '../../images/Vectorlanding.png'
import NewsImage from '../../images/Vectorlanding.png'
import EventCard from "../../components/EventCard";
import Newscard from "../../components/NewsCard";
import GreenButton from "../../components/Buttonn";
// import { Box } from "@mui/system";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import Link from "next/link";
import {useAppDispatch,useAppSelector} from '../../redux/hooks'
import { useEffect } from "react";
import { getMembersEvent, registerForFreeEvent } from "../../redux/memeberEvents/memeberEventsApi";
import { selectMemberEvent } from "../../redux/memeberEvents/memeberEventsSlice";
import { getMemberNews } from "../../redux/memberNews/memberNewsApi";
import { selectMemberNews } from "../../redux/memberNews/memberNewsSlice";
import useToast from "../../hooks/useToast";
import { useState } from "react";
import Spinner from '../../components/Spinner'
import axios from "../../helpers/axios";
import {EventContainerV2, EventV2, GalleryEventGrid, HomeLayout, MainPane, MeetingHeader, PublicationContainerv2, Publicationv2, SidePane } from '../../styles/MembersHome.style'
import { getPublication } from "../../redux/publication/publicationApi";
import { getMemberPublication } from "../../redux/memberPublication/memberPublicationAPi";
import { selectmemberPublication } from "../../redux/memberPublication/memberPublicationSlice";
import { useRouter } from "next/router";
import { selectMeetings } from "../../redux/memberMeeting/memberMeetingSlice";
import { getMeetings } from "../../redux/memberMeeting/memberMeetingApi";


export default function Home(props){
  const route = useRouter()
    const dispatch = useAppDispatch()
    const { status,events} = useAppSelector(selectMemberEvent)
    const {news,status:news_status} = useAppSelector(selectMemberNews)
    const { status:meeting_status,meetings } =useAppSelector(selectMeetings) 
    const [images,setImages] = useState([])
    const {status:pub_status,publication} = useAppSelector(selectmemberPublication)
    const {notify} = useToast()
    const [isLoading,setisLoading]= useState(false)
    const register_for_event = async(data)=>{
        if(!data.id) return 
        setisLoading(true)
        const form = new FormData()
        form.append('event_id',JSON.stringify(data.id))
        const resp = await axios.post('/tenant/event/eventview/register_for_free_event/',form)
        console.log(resp)
        setisLoading(false)
        if(resp.status ==200){
            notify('Registered for Successfully','success')
            setTimeout(()=>{
                window.location.reload()
            },2000)
        }
        if(resp.status==400){
            notify('It a paid event you need to pay','success')

        }
    }
    const getmage =async () =>{

      const resp  = await axios.get('/tenant/extras/galleryview/member_get_gallery/')
      setImages(resp.data.data.data)

  }


    useEffect(()=>{
      dispatch(getMembersEvent({}))
      dispatch(getMeetings({}))
      getmage()
      dispatch(getMemberNews({}))
      dispatch(getMemberPublication({}))
    },[])

   
    // "id": 1,
    // "name": "The ExcoPart",
    // "details": "KKKrndfr",
    // "date_for": "2022-12-14T11:41:40+01:00",
    // "exco": 4,
    // "chapters": null
    return(
        <DashboardLayout>
          {
            isLoading?
            <Spinner/>:''
          }
          <HomeLayout>
            <MainPane>
                <MeetingHeader>
                  <div>
                    <h1>Next Meeting</h1>
                    <p>Dec 23,2022</p>
                  </div>

                  <h3>
                      10<br/>Days
                  </h3>
                </MeetingHeader>
      <br/>
      <br/>
                    <div style={{'padding':'0 1.2rem'}}>
                    <h2>Meeting</h2>
                    </div>
              
   <EventContainerV2>

{
  meetings.slice(0,3).map((data,index)=>(
    <EventV2 key={index}>
    <img
      src='https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fG1lZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
    />
    <h4><small>{data.name}</small></h4>
    <p>{data.details.slice(0,30)}..</p>
    <div className="btn_container">
      <button className="main" onClick={()=>{
        notify('You have successfully registed for this meeting','success')
      }}>Accept</button>
    </div>
  </EventV2>
  ))
}



</EventContainerV2>
                <br/>
                <div style={{'padding':'0 1.2rem'}}>
                    <h2>Event</h2>
                    </div>
      <EventContainerV2>

{
events.slice(0,3).map((data,index)=>(
<EventV2 key={index}>
<img
src={data.image}
/>
<h4><small>{data.name}</small></h4>
<p>
{
data.is_paid_event?
`Amount:${data.amount}`:''
}
</p>
<div className="btn_container">
  {
    data?.event_access.has_paid?
 
 <button className='not_main'>Attend</button>
 
 :
 <button className="main" onClick={()=>{
  if(data.is_paid_event){
    // paid_event()
}   
else{

    registerForFreeEvent({
        'id':data.id,
        'notify':notify,
        setisLoading
    })
} 
}}>Register</button>
  }

</div>
</EventV2>
))
}




</EventContainerV2>
                <br/>

        <h2>Notice/ Publication</h2>
                <PublicationContainerv2>
               
{
  publication.map((pub,index)=>(
    <Publicationv2 key={index}>
    <img src={pub.image}/>
    <h3>
      {pub.name}
    </h3>
    <p>
      {pub.paragraphs.length!=0?pub.paragraphs[0].paragragh.slice(0,50):''}..
    </p>
    <a href="#"style={{'color':'#075a94'}}
      onClick={()=>{
        localStorage.setItem('publication_detail',JSON.stringify(pub))
        route.push('/members/publicationDetail')
      }}
    >Read More</a>
  </Publicationv2>
  ))
}

                </PublicationContainerv2>
            </MainPane>

            <SidePane>
              <h2>Latest Updates</h2>
          {
          images.map((img,index)=>(
            <img className="sideImages" key={index} src={img.photo_file}/>

          ))
          }

            <p
            
            onClick={()=>{
              route.push('/members/gallery')
          }}>See More</p>
            </SidePane>
          </HomeLayout>
        </DashboardLayout>
    )
}