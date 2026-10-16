import { useEffect } from 'react';
import { SiteHeader, SiteFooter } from '../components/SiteChrome';
import about from '../data/about.html?raw'; import privacy from '../data/privacy-policy.html?raw'; import terms from '../data/terms.html?raw'; import disclaimer from '../data/disclaimer.html?raw'; import dmca from '../data/dmca.html?raw';
const content={about,privacy,terms,disclaimer,dmca};
function normalize(html){ const base=import.meta.env.BASE_URL; return html.replaceAll('index.html',base).replaceAll('about.html',`${base}about`).replaceAll('contact.html',`${base}contact`).replaceAll('privacy-policy.html',`${base}privacy-policy`).replaceAll('terms.html',`${base}terms`).replaceAll('disclaimer.html',`${base}disclaimer`).replaceAll('dmca.html',`${base}dmca`); }
export default function LegalPage({type}){ useEffect(()=>{const link=document.createElement('link');link.rel='stylesheet';link.href=`${import.meta.env.BASE_URL}legal.css`;document.head.appendChild(link);return()=>link.remove();},[]); return <><SiteHeader active={`/${type==='privacy'?'privacy-policy':type}`}/><div dangerouslySetInnerHTML={{__html:normalize(content[type])}}/><SiteFooter/></>; }
