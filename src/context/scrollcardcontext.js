'use client'
import { ServiceCardData, ServiceLinkData } from '@/components/serviceComponents/ServicesComponent/CardData';
import { services } from '@/components/serviceComponents/ServicesComponent/ListCompData';
import React, { createContext, useEffect, useRef, useState } from 'react';

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
  const cardRefs = useRef([]); // <-- Refs for scrolling

  function GetServiceCardAPI() {
    const updatedCardData = ServiceCardData.map((card, index) => ({
      ...card,
      link: ServiceLinkData[index] || "",
    }));
    setCarddata(updatedCardData);
    setLinks(ServiceLinkData);
    setListData(services);
  }

  function scrollToCard(index) {
    const ref = cardRefs.current[index];
    if (ref && ref.scrollIntoView) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  useEffect(() => {
    if (!carddata) {
      GetServiceCardAPI();
    }
  }, []);

  return (
    <cardcontext.Provider value={{ carddata, links, listData, cardRefs, scrollToCard }}>
      {children}
    </cardcontext.Provider>
  );
};

export default Scrollcardcontext;
