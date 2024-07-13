'use client'
import { CardService } from "@/app/components/cardService/cardService";
import { Menu } from "@/app/components/nav/nav";
import { getInfoServices } from "@/app/services/Services";
import { useEffect, useState } from "react";

function AppointmentPage() {
  const [infoServices, setInfoServices] = useState([]);

  const getServices = async () => {
    const infoServices = await getInfoServices();
    setInfoServices(infoServices);
  }

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      <header>
        <div>
          <Menu></Menu>
        </div>
      </header>

      <main>
        {infoServices.map((info: any) => (
          <div className="d-flex flex-column align-items-center">
              <CardService infoServices={info} ></CardService>
          </div>
        ))}
      </main>
    </>
  )
}

export default AppointmentPage