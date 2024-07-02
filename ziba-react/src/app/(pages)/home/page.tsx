'use client'
/*import { Logo } from "@/app/components/logo/logo";*/
import { BannerHome } from "@/app/components/bannerHome/bannerHome";
import { Menu } from "@/app/components/nav/nav";
import { Cafeteria } from "@/app/components/cafe/cafe";
import { Footer } from "@/app/components/footer/footer";
import { CardProfessional } from "@/app/components/cardProfessional/cardProfessional";
import { InfoHome } from "@/app/components/infoHome/infoHome";


export default function Home() {
    return (
        <>
          <header>
            <div>
             
              <Menu></Menu>
            </div>
    
          </header>
    
          <main>
           <BannerHome></BannerHome>
           <CardProfessional></CardProfessional>
           <InfoHome></InfoHome>
           <Cafeteria></Cafeteria>
        
          </main>
          <Footer></Footer>
        </>
      )
}