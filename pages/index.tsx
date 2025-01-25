import Link from 'next/link';
import Image from 'next/image';
import Desk from '../public/desk.png';

//  @ts-nocheck

export default function Home({  } : {}){

  

  return (
    
    <main className="flex-1 h-full justify-center items-center 
                      grid overflow-x-hidden min-h-fit md:ml-10">
   
      <div className='self-center p-2 my-10 h-full clearfix
                      drop-shadow-xl bg-p fg-p mt-10'>
        <div className="float-left mr-4 mb-1">
          <Image src={Desk} width={256} height={256} style={{objectFit: "cover"}}  alt="" />
        </div>
        <p className='text-md md:text-xl'>
            <em className='font-medium not-italic'>
              Welcome to my mechanical engineering blog ! 
            </em>
            <span className="ita inline-block mx-4">
              <Link href="/about" className='ita'>Who am I?</Link> 
            </span>
            <span className='my-4 block'></span>
            In this blog, I open up about my journey as an engineer, diving into fascinating
            aspects of mechanical engineering and reflecting on how technology is redefining
            its future. 
            <span className='my-4 block'></span>
            There's no rigid structure here — just a thoughtful collection of lessons I've learned,
            experiences that have shaped me, and topics that spark my curiosity.
            <br />
            <span className='my-4 block'></span>
            Want to know the story behind this blog ? <em>(I made it so it compiles markdown !)</em>,
            <span className="ita inline-block ml-2">
              <Link href="/info" className='ita'>click here!</Link> 
            </span>
            <span className='my-4 block'></span>
            While this is still a blog, I tried to order some of my thoughts in main titles. You can explore
            these in the navigation panel on the right. Still, I suggest you start with 
            <span className='italic font-medium'>
            <Link href="/post/mainfreelancing"> my thoughts on freelancing.</Link> 
            </span>
            <span className='my-4 block'></span>
            <p className='font-bold'>
              Now, go ahead and choose a topic !
            </p>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 my-auto mb-2">
          {/* {
            posts.map(
              (post : any) => 
                <PostCard 
                    name={post.name} 
                    key={post.name}
                    description={post.description} 
                    featureImage={post.featureImage} 
                    link={post.link}
                    
                    />)
          } */}
        </div>
      </div>
    </main>
  )
}

export async function getStaticProps(){
  // let posts = []


  return {
    // props : { posts : posts }
    props : { }
  };
}
