'use client';
import React, { createContext, useEffect, useState } from 'react';
import { services } from '@/components/serviceComponents/ServicesComponent/ListCompData';
import { ServiceCardData } from '@/components/serviceComponents/ServicesComponent/CardData';
import { ServiceLinkData } from '@/components/serviceComponents/ServicesComponent/CardData';

const initialState = {
  carddata: null,
  links: [],
  listData: [],
  setCarddata: () => {},
  GetServiceCardAPI: () => {}
};

export const cardcontext = createContext(initialState);

const Scrollcardcontext = ({ children }) => {
  const [carddata, setCarddata] = useState(null);
  const [listData, setListData] = useState([]);
  const [links, setLinks] = useState([]);

  function GetServiceCardAPI() {
    const updatedCardData = ServiceCardData.map((card, index) => ({
      ...card,
      link: ServiceLinkData[index] || "", // link add karo yaha
    }));
    setCarddata(updatedCardData);
    setLinks(ServiceLinkData);
    setListData(services);
  }

  useEffect(() => {
    if (!carddata) {
      GetServiceCardAPI();
    }
  }, []);

  return (
    <cardcontext.Provider value={{ carddata, links, listData }}>
      {children}
    </cardcontext.Provider>
  );
};

export default Scrollcardcontext;
