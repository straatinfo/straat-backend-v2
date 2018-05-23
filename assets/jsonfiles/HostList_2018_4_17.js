/**

 base on conversion in http://www.convertcsv.com/csv-to-json.htm file: hosts_2018
*/

const hostList = [
  {
    'hostName': 'makati Test Server',
    'address': 'makati',
    'postalCode': '10630',
    'cityName': 'MAKATI',
    'emailAddress': 'globa.jaylord@globalbrainforce.com',
    'phoneNumber': '09063657080',
    'type': 'test'
  },
  {
    'hostName': 'Gemeente Aa en Hunze',
    'address': 'Postbus 93',
    'postalCode': '9460 AB',
    'cityName': 'GIETEN',
    'emailAddress': 'aa@straat.info',
    'phoneNumber': '14 0592'
  },
  {
    'hostName': 'Gemeente Aalburg',
    'address': 'Postbus 40',
    'postalCode': '4260 AA',
    'cityName': 'WIJK EN AALBURG',
    'emailAddress': 'aalburg@straat.info',
    'phoneNumber': '(0416) 69 87 00'
  },
  {
    'hostName': 'Gemeente Aalsmeer',
    'address': 'Postbus 253',
    'postalCode': '1430 AG',
    'cityName': 'AALSMEER',
    'emailAddress': 'aalsmeer@straat.info',
    'phoneNumber': '(0297) 38 75 75'
  },
  {
    'hostName': 'Gemeente Aalten',
    'address': 'Postbus 119',
    'postalCode': '7120 AC',
    'cityName': 'AALTEN',
    'emailAddress': 'aalten@straat.info',
    'phoneNumber': '(0543) 49 33 33'
  },
  {
    'hostName': 'Gemeente Achtkarspelen',
    'address': 'Postbus 2',
    'postalCode': '9285 ZV',
    'cityName': 'BUITENPOST',
    'emailAddress': 'achtkarspelen@straat.info',
    'phoneNumber': '14 0511'
  },
  {
    'hostName': 'Gemeente Alblasserdam',
    'address': 'Postbus 2',
    'postalCode': '2950 AA',
    'cityName': 'ALBLASSERDAM',
    'emailAddress': 'alblasserdam@straat.info',
    'phoneNumber': '14 078'
  },
  {
    'hostName': 'Gemeente Albrandswaard',
    'address': 'Postbus 1000',
    'postalCode': '3160 GA',
    'cityName': 'RHOON',
    'emailAddress': 'albrandswaard@straat.info',
    'phoneNumber': '(010) 506 11 11'
  },
  {
    'hostName': 'Gemeente Alkmaar',
    'address': 'Postbus 53',
    'postalCode': '1800 BC',
    'cityName': 'ALKMAAR',
    'emailAddress': 'alkmaar@straat.info',
    'phoneNumber': '14072'
  },
  {
    'hostName': 'Gemeente Almelo',
    'address': 'Postbus 5100',
    'postalCode': '7600 GC',
    'cityName': 'ALMELO',
    'emailAddress': 'almelo@straat.info',
    'phoneNumber': '(0546) 54 11 11'
  },
  {
    'hostName': 'Gemeente Almere',
    'address': 'Postbus 200',
    'postalCode': '1300 AE',
    'cityName': 'ALMERE',
    'emailAddress': 'almere@straat.info',
    'phoneNumber': '14 036'
  },
  {
    'hostName': 'Gemeente Alphen aan den Rijn',
    'address': 'Postbus 13',
    'postalCode': '2400 AA',
    'cityName': 'ALPHEN AAN DEN RIJN',
    'emailAddress': 'alphenaandenrijn@straat.info',
    'phoneNumber': '14 0172'
  },
  {
    'hostName': 'Gemeente Alphen-Chaam',
    'address': 'Postbus 3',
    'postalCode': '5130 AA',
    'cityName': 'ALPHEN NB',
    'emailAddress': 'alphenchaam@straat.info',
    'phoneNumber': '(013) 508 66 66'
  },
  {
    'hostName': 'Gemeente Ameland',
    'address': 'Postbus 22',
    'postalCode': '9160 AA',
    'cityName': 'HOLLUM',
    'emailAddress': 'ameland@straat.info',
    'phoneNumber': '(0519) 55 55 55'
  },
  {
    'hostName': 'Gemeente Amersfoort',
    'address': 'Postbus 4000',
    'postalCode': '3800 EA',
    'cityName': 'AMERSFOORT',
    'emailAddress': 'amersfoort@straat.info',
    'phoneNumber': '14 033'
  },
  {
    'hostName': 'Gemeente Amstelveen',
    'address': 'Postbus 4',
    'postalCode': '1180 BA',
    'cityName': 'AMSTELVEEN',
    'emailAddress': 'amstelveen@straat.info',
    'phoneNumber': '(020) 540 49 11'
  },
  {
    'hostName': 'Gemeente Amsterdam',
    'address': 'Postbus 202',
    'postalCode': '1000 AE',
    'cityName': 'AMSTERDAM',
    'emailAddress': 'amsterdam@straat.info',
    'phoneNumber': '14 020'
  },
  {
    'hostName': 'Gemeente Apeldoorn',
    'address': 'Postbus 9033',
    'postalCode': '7300 ES',
    'cityName': 'APELDOORN',
    'emailAddress': 'apeldoorn@straat.info',
    'phoneNumber': '14 055'
  },
  {
    'hostName': 'Gemeente Appingedam',
    'address': 'Postbus 15',
    'postalCode': '9900 AA',
    'cityName': 'APPINGEDAM',
    'emailAddress': 'appingedam@straat.info',
    'phoneNumber': '14 0596'
  },
  {
    'hostName': 'Gemeente Arnhem',
    'address': 'Postbus 9029',
    'postalCode': '6800 EL',
    'cityName': 'ARNHEM',
    'emailAddress': 'arnhem@straat.info',
    'phoneNumber': '0900 1809'
  },
  {
    'hostName': 'Gemeente Assen',
    'address': 'Postbus 30018',
    'postalCode': '9400 RA',
    'cityName': 'ASSEN',
    'emailAddress': 'assen@straat.info',
    'phoneNumber': '(0592) 36 69 11'
  },
  {
    'hostName': 'Gemeente Asten',
    'address': 'Postbus 290',
    'postalCode': '5720 AG',
    'cityName': 'ASTEN',
    'emailAddress': 'asten@straat.info',
    'phoneNumber': '(0493) 67 12 12'
  },
  {
    'hostName': 'Gemeente Baarle-Nassau',
    'address': 'Postbus 105',
    'postalCode': '5110 AC',
    'cityName': 'BAARLE-NASSAU',
    'emailAddress': 'baarle@straat.info',
    'phoneNumber': '(013) 507 52 00'
  },
  {
    'hostName': 'Gemeente Baarn',
    'address': 'Postbus 1003',
    'postalCode': '3740 BA',
    'cityName': 'BAARN',
    'emailAddress': 'baarn@straat.info',
    'phoneNumber': '(035) 548 16 11'
  },
  {
    'hostName': 'Gemeente Barendrecht',
    'address': 'Postbus 501',
    'postalCode': '2990 EA',
    'cityName': 'BARENDRECHT',
    'emailAddress': 'barendrecht@straat.info',
    'phoneNumber': '14 0180'
  },
  {
    'hostName': 'Gemeente Barneveld',
    'address': 'Postbus 63',
    'postalCode': '3770 AB',
    'cityName': 'BARNEVELD',
    'emailAddress': 'barneveld@straat.info',
    'phoneNumber': '14 0342'
  },
  {
    'hostName': 'Gemeente Bedum',
    'address': 'Postbus 38',
    'postalCode': '9780 AA',
    'cityName': 'BEDUM',
    'emailAddress': 'bedum@straat.info',
    'phoneNumber': '(050) 301 89 11'
  },
  {
    'hostName': 'Gemeente Beek',
    'address': 'Postbus 20',
    'postalCode': '6190 AA',
    'cityName': 'BEEK LB',
    'emailAddress': 'beek@straat.info',
    'phoneNumber': '(046) 438 92 22'
  },
  {
    'hostName': 'Gemeente Beemster',
    'address': 'Postbus 7',
    'postalCode': '1462 ZG',
    'cityName': 'MIDDENBEEMSTER',
    'emailAddress': 'beemster@straat.info',
    'phoneNumber': '(0299) 68 21 00'
  },
  {
    'hostName': 'Gemeente Beesel',
    'address': 'Postbus 4750',
    'postalCode': '5953 ZK',
    'cityName': 'REUVER',
    'emailAddress': 'beesel@straat.info',
    'phoneNumber': '(077) 474 92 92'
  },
  {
    'hostName': 'Gemeente Bergeijk',
    'address': 'Postbus 10000',
    'postalCode': '5570 GA',
    'cityName': 'BERGEIJK',
    'emailAddress': 'bergeijk@straat.info',
    'phoneNumber': '(0497) 55 14 55'
  },
  {
    'hostName': 'Gemeente Bergen (L)',
    'address': 'Postbus 140',
    'postalCode': '5854 ZJ',
    'cityName': 'BERGEN LB',
    'emailAddress': 'bergenLIMBURG@straat.info',
    'phoneNumber': '(0485) 34 83 83'
  },
  {
    'hostName': 'Gemeente Bergen NH',
    'address': 'Postbus 175',
    'postalCode': '1860 AD',
    'cityName': 'BERGEN NH',
    'emailAddress': 'bergenNOORDHOLLAND@straat.info',
    'phoneNumber': '(072) 888 00 00'
  },
  {
    'hostName': 'Gemeente Bergen op Zoom',
    'address': 'Postbus 35',
    'postalCode': '4600 AA',
    'cityName': 'BERGEN OP ZOOM',
    'emailAddress': 'bergenopzoom@straat.info',
    'phoneNumber': '(0164) 27 70 00'
  },
  {
    'hostName': 'Gemeente Berkelland',
    'address': 'Postbus 200',
    'postalCode': '7270 HA',
    'cityName': 'BORCULO',
    'emailAddress': 'berkelland@straat.info',
    'phoneNumber': '(0545) 25 02 50'
  },
  {
    'hostName': 'Gemeente Bernheze',
    'address': 'Postbus 19',
    'postalCode': '5384 ZG',
    'cityName': 'HEESCH',
    'emailAddress': 'bernheze@straat.info',
    'phoneNumber': '(0412) 45 88 88'
  },
  {
    'hostName': 'Gemeente Best',
    'address': 'Postbus 50',
    'postalCode': '5680 AB',
    'cityName': 'BEST',
    'emailAddress': 'best@straat.info',
    'phoneNumber': '(0499) 36 09 11'
  },
  {
    'hostName': 'Gemeente Beuningen',
    'address': 'Postbus 14',
    'postalCode': '6640 AA',
    'cityName': 'BEUNINGEN GLD',
    'emailAddress': 'beuningen@straat.info',
    'phoneNumber': '14 024'
  },
  {
    'hostName': 'Gemeente Beverwijk',
    'address': 'Postbus 450',
    'postalCode': '1940 AL',
    'cityName': 'BEVERWIJK',
    'emailAddress': 'beverwijk@straat.info',
    'phoneNumber': '(0251) 25 62 56'
  },
  {
    'hostName': 'Gemeente Binnenmaas',
    'address': 'Postbus 5455',
    'postalCode': '3299 ZH',
    'cityName': 'MAASDAM',
    'emailAddress': 'binnenmaas@straat.info',
    'phoneNumber': '(078) 676 44 33'
  },
  {
    'hostName': 'Gemeente Bladel',
    'address': 'Postbus 11',
    'postalCode': '5530 AA',
    'cityName': 'BLADEL',
    'emailAddress': 'bladel@straat.info',
    'phoneNumber': '(0497) 36 16 36'
  },
  {
    'hostName': 'Gemeente Blaricum',
    'address': 'Postbus 71',
    'postalCode': '3755 ZH',
    'cityName': 'EEMNES',
    'emailAddress': 'blaricum@straat.info',
    'phoneNumber': '(035) 751 32 22'
  },
  {
    'hostName': 'Gemeente Bloemendaal',
    'address': 'Postbus 201',
    'postalCode': '2050 AE',
    'cityName': 'OVERVEEN',
    'emailAddress': 'bloemendaal@straat.info',
    'phoneNumber': '14 023'
  },
  {
    'hostName': 'Gemeente Bodegraven-Reeuwijk',
    'address': 'Postbus 401',
    'postalCode': '2410 AK',
    'cityName': 'BODEGRAVEN',
    'emailAddress': 'bodegraven@straat.info',
    'phoneNumber': '(0172) 52 25 22'
  },
  {
    'hostName': 'Gemeente Boekel',
    'address': 'Postbus 99',
    'postalCode': '5427 ZH',
    'cityName': 'BOEKEL',
    'emailAddress': 'boekel@straat.info',
    'phoneNumber': '(0492) 32 68 00'
  },
  {
    'hostName': 'Gemeente Borger-Odoorn',
    'address': 'Postbus 3',
    'postalCode': '7875 ZG',
    'cityName': 'EXLOO',
    'emailAddress': 'borger@straat.info',
    'phoneNumber': '14 0591'
  },
  {
    'hostName': 'Gemeente Borne',
    'address': 'Postbus 200',
    'postalCode': '7620 AE',
    'cityName': 'BORNE',
    'emailAddress': 'borne@straat.info',
    'phoneNumber': '(074) 265 86 86'
  },
  {
    'hostName': 'Gemeente Borsele',
    'address': 'Postbus 1',
    'postalCode': '4450 AA',
    'cityName': 'HEINKENSZAND',
    'emailAddress': 'borsele@straat.info',
    'phoneNumber': '(0113) 23 83 83'
  },
  {
    'hostName': 'Gemeente Boxmeer',
    'address': 'Postbus 450',
    'postalCode': '5830 AL',
    'cityName': 'BOXMEER',
    'emailAddress': 'boxmeer@straat.info',
    'phoneNumber': '(0485) 58 59 11'
  },
  {
    'hostName': 'Gemeente Boxtel',
    'address': 'Postbus 10000',
    'postalCode': '5280 DA',
    'cityName': 'BOXTEL',
    'emailAddress': 'boxtel@straat.info',
    'phoneNumber': '(0411) 65 59 11'
  },
  {
    'hostName': 'Gemeente Breda',
    'address': 'Postbus 90156',
    'postalCode': '4800 RH',
    'cityName': 'BREDA',
    'emailAddress': 'breda@straat.info',
    'phoneNumber': '14 076'
  },
  {
    'hostName': 'Gemeente Brielle',
    'address': 'Postbus 101',
    'postalCode': '3230 AC',
    'cityName': 'BRIELLE',
    'emailAddress': 'brielle@straat.info',
    'phoneNumber': '(0181) 47 11 11'
  },
  {
    'hostName': 'Gemeente Bronckhorst',
    'address': 'Postbus 200',
    'postalCode': '7255 ZJ',
    'cityName': 'HENGELO GLD',
    'emailAddress': 'bronckhorst@straat.info',
    'phoneNumber': '(0575) 75 02 50'
  },
  {
    'hostName': 'Gemeente Brummen',
    'address': 'Postbus 5',
    'postalCode': '6970 AA',
    'cityName': 'BRUMMEN',
    'emailAddress': 'brummen@straat.info',
    'phoneNumber': '(0575) 56 82 33'
  },
  {
    'hostName': 'Gemeente Brunssum',
    'address': 'Postbus 250',
    'postalCode': '6440 AG',
    'cityName': 'BRUNSSUM',
    'emailAddress': 'brunssum@straat.info',
    'phoneNumber': '(045) 527 85 55'
  },
  {
    'hostName': 'Gemeente Bunnik',
    'address': 'Postbus 5',
    'postalCode': '3980 CA',
    'cityName': 'BUNNIK',
    'emailAddress': 'bunnik@straat.info',
    'phoneNumber': '(030) 659 48 48'
  },
  {
    'hostName': 'Gemeente Bunschoten',
    'address': 'Postbus 200',
    'postalCode': '3750 GE',
    'cityName': 'BUNSCHOTEN-SPAKENBURG',
    'emailAddress': 'bunschoten@straat.info',
    'phoneNumber': '14033'
  },
  {
    'hostName': 'Gemeente Buren',
    'address': 'Postbus 23',
    'postalCode': '4020 BA',
    'cityName': 'MAURIK',
    'emailAddress': 'buren@straat.info',
    'phoneNumber': '14 0344'
  },
  {
    'hostName': 'Gemeente Capelle aan den IJssel',
    'address': 'Postbus 70',
    'postalCode': '2900 AB',
    'cityName': 'CAPELLE AAN DEN IJSSEL',
    'emailAddress': 'capelle@straat.info',
    'phoneNumber': '(010) 284 84 84'
  },
  {
    'hostName': 'Gemeente Castricum',
    'address': 'Postbus 1301',
    'postalCode': '1900 BH',
    'cityName': 'CASTRICUM',
    'emailAddress': 'castricum@straat.info',
    'phoneNumber': '(0251) 66 11 22'
  },
  {
    'hostName': 'Gemeente Coevorden',
    'address': 'Postbus 2',
    'postalCode': '7740 AA',
    'cityName': 'COEVORDEN',
    'emailAddress': 'coevorden@straat.info',
    'phoneNumber': '14 0524'
  },
  {
    'hostName': 'Gemeente Cranendonck',
    'address': 'Postbus 2090',
    'postalCode': '6020 AB',
    'cityName': 'BUDEL',
    'emailAddress': 'cranendonck@straat.info',
    'phoneNumber': '(0495) 43 12 22'
  },
  {
    'hostName': 'Gemeente Cromstrijen',
    'address': 'Postbus 7400',
    'postalCode': '3280 AE',
    'cityName': 'NUMANSDORP',
    'emailAddress': 'cromstrijen@straat.info',
    'phoneNumber': '(0186) 65 61 00'
  },
  {
    'hostName': 'Gemeente Cuijk',
    'address': 'Postbus 7',
    'postalCode': '5360 AA',
    'cityName': 'GRAVE',
    'emailAddress': 'cuijk@straat.info',
    'phoneNumber': '(0485) 39 66 00'
  },
  {
    'hostName': 'Gemeente Culemborg',
    'address': 'Postbus 136',
    'postalCode': '4100 AC',
    'cityName': 'CULEMBORG',
    'emailAddress': 'culemborg@straat.info',
    'phoneNumber': '(0345) 47 77 00'
  },
  {
    'hostName': 'Gemeente Dalfsen',
    'address': 'Postbus 35',
    'postalCode': '7720 AA',
    'cityName': 'DALFSEN',
    'emailAddress': 'dalfsen@straat.info',
    'phoneNumber': '(0529) 48 83 88'
  },
  {
    'hostName': 'Gemeente Dantumadiel',
    'address': 'Postbus 22',
    'postalCode': '9104 ZG',
    'cityName': 'DAMWALD',
    'emailAddress': 'dantumadiel@straat.info',
    'phoneNumber': '14+ 0511'
  },
  {
    'hostName': 'Gemeente De Bilt',
    'address': 'Postbus 300',
    'postalCode': '3720 AH',
    'cityName': 'BILTHOVEN',
    'emailAddress': 'debilst@straat.info',
    'phoneNumber': '(030) 228 94 11'
  },
  {
    'hostName': 'Gemeente De Fryske Marren',
    'address': 'Postbus 101',
    'postalCode': '8500 AC',
    'cityName': 'JOURE',
    'emailAddress': 'Defryskemarren@straat.info',
    'phoneNumber': '14 05 14'
  },
  {
    'hostName': 'Gemeente De Marne',
    'address': 'Postbus 11',
    'postalCode': '9965 ZG',
    'cityName': 'LEENS',
    'emailAddress': 'demarne@straat.info',
    'phoneNumber': '(0595) 57 55 00'
  },
  {
    'hostName': 'Gemeente De Ronde Venen',
    'address': 'Postbus 250',
    'postalCode': '3640 AG',
    'cityName': 'MIJDRECHT',
    'emailAddress': 'derondevenen@straat.info',
    'phoneNumber': '(0297) 29 16 16'
  },
  {
    'hostName': 'Gemeente De Wolden',
    'address': 'Postbus 20',
    'postalCode': '7920 AA',
    'cityName': 'ZUIDWOLDE DR',
    'emailAddress': 'dewolden@straat.info',
    'phoneNumber': '14 0528'
  },
  {
    'hostName': 'Gemeente Delft',
    'address': 'Postbus 78',
    'postalCode': '2600 ME',
    'cityName': 'DELFT',
    'emailAddress': 'delft@straat.info',
    'phoneNumber': '14015'
  },
  {
    'hostName': 'Gemeente Delfzijl',
    'address': 'Postbus 20000',
    'postalCode': '9930 PA',
    'cityName': 'DELFZIJL',
    'emailAddress': 'delfzijl@straat.info',
    'phoneNumber': '140596'
  },
  {
    'hostName': 'Gemeente Den Haag',
    'address': 'Postbus 12600',
    'postalCode': '2500 DJ',
    'cityName': "'S-GRAVENHAGE",
    'emailAddress': 'denhaag@straat.info',
    'phoneNumber': '14070'
  },
  {
    'hostName': 'Gemeente Den Helder',
    'address': 'Postbus 36',
    'postalCode': '1780 AA',
    'cityName': 'DEN HELDER',
    'emailAddress': 'denhelder@straat.info',
    'phoneNumber': '(0223) 67 12 00'
  },
  {
    'hostName': 'Gemeente Deurne',
    'address': 'Postbus 3',
    'postalCode': '5750 AA',
    'cityName': 'DEURNE',
    'emailAddress': 'deurne@straat.info',
    'phoneNumber': '(0493) 38 77 11'
  },
  {
    'hostName': 'Gemeente Deventer',
    'address': 'Postbus 5000',
    'postalCode': '7400 GC',
    'cityName': 'DEVENTER',
    'emailAddress': 'deventer@straat.info',
    'phoneNumber': '14 0570'
  },
  {
    'hostName': 'Gemeente Diemen',
    'address': 'Postbus 191',
    'postalCode': '1110 AD',
    'cityName': 'DIEMEN',
    'emailAddress': 'diemen@straat.info',
    'phoneNumber': '(020) 314 48 88'
  },
  {
    'hostName': 'Gemeente Dinkelland',
    'address': 'Postbus 11',
    'postalCode': '7590 AA',
    'cityName': 'DENEKAMP',
    'emailAddress': 'dinkelland@straat.info',
    'phoneNumber': '(0541) 85 41 00'
  },
  {
    'hostName': 'Gemeente Doesburg',
    'address': 'Postbus 100',
    'postalCode': '6980 AC',
    'cityName': 'DOESBURG',
    'emailAddress': 'doesburg@straat.info',
    'phoneNumber': '(0313) 48 13 13'
  },
  {
    'hostName': 'Gemeente Doetinchem',
    'address': 'Postbus 9020',
    'postalCode': '7000 HA',
    'cityName': 'DOETINCHEM',
    'emailAddress': 'doetinchem@straat.info',
    'phoneNumber': '(0314) 37 73 77'
  },
  {
    'hostName': 'Gemeente Dongen',
    'address': 'Postbus 10153',
    'postalCode': '5100 GE',
    'cityName': 'DONGEN',
    'emailAddress': 'dongen@straat.info',
    'phoneNumber': '(0162) 38 32 00'
  },
  {
    'hostName': 'Gemeente Dongeradeel',
    'address': 'Postbus 1',
    'postalCode': '9100 AA',
    'cityName': 'DOKKUM',
    'emailAddress': 'dongeradeel@straat.info',
    'phoneNumber': '14 0519'
  },
  {
    'hostName': 'Gemeente Dordrecht',
    'address': 'Postbus 8',
    'postalCode': '3300 AA',
    'cityName': 'DORDRECHT',
    'emailAddress': 'dordrecht@straat.info',
    'phoneNumber': '14078'
  },
  {
    'hostName': 'Gemeente Drechterland',
    'address': 'Postbus 9',
    'postalCode': '1616 ZG',
    'cityName': 'HOOGKARSPEL',
    'emailAddress': 'drechterland@straat.info',
    'phoneNumber': '(0228) 35 23 52'
  },
  {
    'hostName': 'Gemeente Drimmelen',
    'address': 'Postbus 19',
    'postalCode': '4920 AA',
    'cityName': 'MADE',
    'emailAddress': 'drimmelen@straat.info',
    'phoneNumber': '(0162) 69 01 90'
  },
  {
    'hostName': 'Gemeente Dronten',
    'address': 'Postbus 100',
    'postalCode': '8250 AC',
    'cityName': 'DRONTEN',
    'emailAddress': 'dronten@straat.info',
    'phoneNumber': '140321'
  },
  {
    'hostName': 'Gemeente Druten',
    'address': 'Postbus 1',
    'postalCode': '6650 AA',
    'cityName': 'DRUTEN',
    'emailAddress': 'druten@straat.info',
    'phoneNumber': '14 0487'
  },
  {
    'hostName': 'Gemeente Duiven',
    'address': 'Postbus 6',
    'postalCode': '6920 AA',
    'cityName': 'DUIVEN',
    'emailAddress': 'duiven@straat.info',
    'phoneNumber': '(0316) 27 91 11'
  },
  {
    'hostName': 'Gemeente Echt-Susteren',
    'address': 'Postbus 450',
    'postalCode': '6100 AL',
    'cityName': 'ECHT',
    'emailAddress': 'echt@straat.info',
    'phoneNumber': '(0475) 47 84 78'
  },
  {
    'hostName': 'Gemeente Edam-Volendam',
    'address': 'Postbus 180',
    'postalCode': '1130 AD',
    'cityName': 'VOLENDAM',
    'emailAddress': 'edam@straat.info',
    'phoneNumber': '(0299) 39 83 98'
  },
  {
    'hostName': 'Gemeente Ede',
    'address': 'Postbus 9022',
    'postalCode': '6710 HK',
    'cityName': 'EDE GLD',
    'emailAddress': 'ede@straat.info',
    'phoneNumber': '14-0318'
  },
  {
    'hostName': 'Gemeente Eemnes',
    'address': 'Postbus 71',
    'postalCode': '3755 ZH',
    'cityName': 'EEMNES',
    'emailAddress': 'eemnes@straat.info',
    'phoneNumber': '14035'
  },
  {
    'hostName': 'Gemeente Eemsmond',
    'address': 'Postbus 11',
    'postalCode': '9980 AA',
    'cityName': 'UITHUIZEN',
    'emailAddress': 'eemsmond@straat.info',
    'phoneNumber': '(0595) 43 75 55'
  },
  {
    'hostName': 'Gemeente Eersel',
    'address': 'Postbus 12',
    'postalCode': '5520 AA',
    'cityName': 'EERSEL',
    'emailAddress': 'eersel@straat.info',
    'phoneNumber': '(0497) 53 13 00'
  },
  {
    'hostName': 'Gemeente Eijsden-Margraten',
    'address': 'Postbus 10',
    'postalCode': '6269 ZG',
    'cityName': 'MARGRATEN',
    'emailAddress': 'eijsden@straat.info',
    'phoneNumber': '(043) 458 84 88'
  },
  {
    'hostName': 'Gemeente Eindhoven',
    'address': 'Postbus 90150',
    'postalCode': '5600 RB',
    'cityName': 'EINDHOVEN',
    'emailAddress': 'eindhoven@straat.info',
    'phoneNumber': '14 040'
  },
  {
    'hostName': 'Gemeente Elburg',
    'address': 'Postbus 70',
    'postalCode': '8080 AB',
    'cityName': 'ELBURG',
    'emailAddress': 'elburg@straat.info',
    'phoneNumber': '(0525) 68 86 88'
  },
  {
    'hostName': 'Gemeente Emmen',
    'address': 'Postbus 30001',
    'postalCode': '7800 RA',
    'cityName': 'EMMEN',
    'emailAddress': 'emmen@straat.info',
    'phoneNumber': '14 0591'
  },
  {
    'hostName': 'Gemeente Enkhuizen',
    'address': 'Postbus 11',
    'postalCode': '1600 AA',
    'cityName': 'ENKHUIZEN',
    'emailAddress': 'enkhuizen@straat.info',
    'phoneNumber': '(0228) 36 01 00'
  },
  {
    'hostName': 'Gemeente Enschede',
    'address': 'Postbus 20',
    'postalCode': '7500 AA',
    'cityName': 'ENSCHEDE',
    'emailAddress': 'enschede@straat.info',
    'phoneNumber': '14053'
  },
  {
    'hostName': 'Gemeente Epe',
    'address': 'Postbus 600',
    'postalCode': '8160 AP',
    'cityName': 'EPE',
    'emailAddress': 'epe@straat.info',
    'phoneNumber': '14 0578'
  },
  {
    'hostName': 'Gemeente Ermelo',
    'address': 'Postbus 500',
    'postalCode': '3850 AM',
    'cityName': 'ERMELO',
    'emailAddress': 'ermelo@straat.info',
    'phoneNumber': '(0341) 56 73 21'
  },
  {
    'hostName': 'Gemeente Etten-Leur',
    'address': 'Postbus 10100',
    'postalCode': '4870 GA',
    'cityName': 'ETTEN-LEUR',
    'emailAddress': 'etten@straat.info',
    'phoneNumber': '14076'
  },
  {
    'hostName': 'Gemeente Ferwerderadiel',
    'address': 'Postbus 2',
    'postalCode': '9172 ZS',
    'cityName': 'FERWERT',
    'emailAddress': 'ferwerderadiel@straat.info',
    'phoneNumber': '(0518) 41 88 88'
  },
  {
    'hostName': 'Gemeente Geertruidenberg',
    'address': 'Postbus 10001',
    'postalCode': '4940 GA',
    'cityName': 'RAAMSDONKSVEER',
    'emailAddress': 'geertruidenberg@straat.info',
    'phoneNumber': '140162'
  },
  {
    'hostName': 'Gemeente Geldermalsen',
    'address': 'Postbus 112',
    'postalCode': '4190 CC',
    'cityName': 'GELDERMALSEN',
    'emailAddress': 'geldermalsen@straat.info',
    'phoneNumber': '(0345) 58 66 11'
  },
  {
    'hostName': 'Gemeente Geldrop-Mierlo',
    'address': 'Postbus 10101',
    'postalCode': '5660 GA',
    'cityName': 'GELDROP',
    'emailAddress': 'geldrop@straat.info',
    'phoneNumber': '14 040'
  },
  {
    'hostName': 'Gemeente Gemert-Bakel',
    'address': 'Postbus 10000',
    'postalCode': '5420 DA',
    'cityName': 'GEMERT',
    'emailAddress': 'gemert@straat.info',
    'phoneNumber': '(0492) 37 85 00'
  },
  {
    'hostName': 'Gemeente Gennep',
    'address': 'Postbus 9003',
    'postalCode': '6590 HD',
    'cityName': 'GENNEP',
    'emailAddress': 'gennep@straat.info',
    'phoneNumber': '(0485) 49 41 41'
  },
  {
    'hostName': 'Gemeente Giessenlanden',
    'address': 'Postbus 1',
    'postalCode': '4223 ZG',
    'cityName': 'HOORNAAR',
    'emailAddress': 'giessenlanden@straat.info',
    'phoneNumber': '(0183) 58 38 38'
  },
  {
    'hostName': 'Gemeente Gilze en Rijen',
    'address': 'Postbus 73',
    'postalCode': '5120 AB',
    'cityName': 'RIJEN',
    'emailAddress': 'gilze@straat.info',
    'phoneNumber': '14 0161'
  },
  {
    'hostName': 'Gemeente Goeree-Overflakkee',
    'address': 'Postbus 1',
    'postalCode': '3240 AA',
    'cityName': 'MIDDELHARNIS',
    'emailAddress': 'goeree@straat.info',
    'phoneNumber': '14 0187'
  },
  {
    'hostName': 'Gemeente Goes',
    'address': 'Postbus 2118',
    'postalCode': '4460 MC',
    'cityName': 'GOES',
    'emailAddress': 'goes@straat.info',
    'phoneNumber': '(0113) 24 96 00'
  },
  {
    'hostName': 'Gemeente Goirle',
    'address': 'Postbus 17',
    'postalCode': '5050 AA',
    'cityName': 'GOIRLE',
    'emailAddress': 'goirle@straat.info',
    'phoneNumber': '(013) 531 06 10'
  },
  {
    'hostName': 'Gemeente Gooise Meren',
    'address': 'Postbus 6000',
    'postalCode': '1400 HA',
    'cityName': 'Bussum',
    'emailAddress': 'gooise@straat.info',
    'phoneNumber': '(035) 207 00 00'
  },
  {
    'hostName': 'Gemeente Gorinchem',
    'address': 'Postbus 108',
    'postalCode': '4200 AC',
    'cityName': 'GORINCHEM',
    'emailAddress': 'gorinchem@straat.info',
    'phoneNumber': '(0183) 65 95 95'
  },
  {
    'hostName': 'Gemeente Gouda',
    'address': 'Postbus 1086',
    'postalCode': '2800 BB',
    'cityName': 'GOUDA',
    'emailAddress': 'gouda@straat.info',
    'phoneNumber': '14 0182'
  },
  {
    'hostName': 'Gemeente Grave',
    'address': 'Postbus 7',
    'postalCode': '5360 AA',
    'cityName': 'GRAVE',
    'emailAddress': 'grave@straat.info',
    'phoneNumber': '(0486) 47 72 77'
  },
  {
    'hostName': 'Gemeente Groesbeek',
    'address': 'Postbus 20',
    'postalCode': '6560 AA',
    'cityName': 'GROESBEEK',
    'emailAddress': 'groesbeek@straat.info',
    'phoneNumber': '14024'
  },
  {
    'hostName': 'Gemeente Groningen',
    'address': 'Postbus 20001',
    'postalCode': '9700 PB',
    'cityName': 'GRONINGEN',
    'emailAddress': 'groningen@straat.info',
    'phoneNumber': '(050) 367 91 11'
  },
  {
    'hostName': 'Gemeente Grootegast',
    'address': 'Postbus 46',
    'postalCode': '9860 AA',
    'cityName': 'GROOTEGAST',
    'emailAddress': 'grootegast@straat.info',
    'phoneNumber': '14-0594'
  },
  {
    'hostName': 'Gemeente Gulpen-Wittem',
    'address': 'Postbus 56',
    'postalCode': '6270 AB',
    'cityName': 'GULPEN',
    'emailAddress': 'gulpen@straat.info',
    'phoneNumber': '(043) 880 06 00'
  },
  {
    'hostName': 'Gemeente Haaksbergen',
    'address': 'Postbus 102',
    'postalCode': '7480 AC',
    'cityName': 'HAAKSBERGEN',
    'emailAddress': 'haaksbergen@straat.info',
    'phoneNumber': '(053) 573 45 67'
  },
  {
    'hostName': 'Gemeente Haaren',
    'address': 'Postbus 44',
    'postalCode': '5076 ZG',
    'cityName': 'HAAREN',
    'emailAddress': 'haaren@straat.info',
    'phoneNumber': '(0411) 62 72 82'
  },
  {
    'hostName': 'Gemeente Haarlem',
    'address': 'Postbus 511',
    'postalCode': '2003 PB',
    'cityName': 'HAARLEM',
    'emailAddress': 'haarlem@straat.info',
    'phoneNumber': '14023'
  },
  {
    'hostName': 'Gemeente Haarlemmerliede en Spaarnwoude',
    'address': 'Postbus 83',
    'postalCode': '1160 AB',
    'cityName': 'ZWANENBURG',
    'emailAddress': 'haarlemmerliede@straat.info',
    'phoneNumber': '(020) 407 90 00'
  },
  {
    'hostName': 'Gemeente Haarlemmermeer',
    'address': 'Postbus 250',
    'postalCode': '2130 AG',
    'cityName': 'HOOFDDORP',
    'emailAddress': 'haarlemmermeer@straat.info',
    'phoneNumber': '0900 1852'
  },
  {
    'hostName': 'Gemeente Halderberge',
    'address': 'Postbus 5',
    'postalCode': '4730 AA',
    'cityName': 'OUDENBOSCH',
    'emailAddress': 'halderberge@straat.info',
    'phoneNumber': '(0165) 39 05 00'
  },
  {
    'hostName': 'Gemeente Hardenberg',
    'address': 'Postbus 500',
    'postalCode': '7770 BA',
    'cityName': 'HARDENBERG',
    'emailAddress': 'hardenberg@straat.info',
    'phoneNumber': '14 0523'
  },
  {
    'hostName': 'Gemeente Harderwijk',
    'address': 'Postbus 149',
    'postalCode': '3840 AC',
    'cityName': 'HARDERWIJK',
    'emailAddress': 'harderwijk@straat.info',
    'phoneNumber': '(0341) 41 19 11'
  },
  {
    'hostName': 'Gemeente Hardinxveld-Giessendam',
    'address': 'Postbus 175',
    'postalCode': '3370 AD',
    'cityName': 'HARDINXVELD-GIESSENDAM',
    'emailAddress': 'hardinxveld@straat.info',
    'phoneNumber': '14 0184'
  },
  {
    'hostName': 'Gemeente Haren',
    'address': 'Postbus 21',
    'postalCode': '9750 AA',
    'cityName': 'HAREN GN',
    'emailAddress': 'haren@straat.info',
    'phoneNumber': '14050'
  },
  {
    'hostName': 'Gemeente Harlingen',
    'address': 'Postbus 10000',
    'postalCode': '8860 HA',
    'cityName': 'HARLINGEN',
    'emailAddress': 'harlingen@straat.info',
    'phoneNumber': '(0517) 49 22 22'
  },
  {
    'hostName': 'Gemeente Hattem',
    'address': 'Postbus 93',
    'postalCode': '8050 AB',
    'cityName': 'HATTEM',
    'emailAddress': 'hattem@straat.info',
    'phoneNumber': '(038) 443 16 16'
  },
  {
    'hostName': 'Gemeente Heemskerk',
    'address': 'Postbus 1',
    'postalCode': '1960 AA',
    'cityName': 'HEEMSKERK',
    'emailAddress': 'heemskerk@straat.info',
    'phoneNumber': '14 0251'
  },
  {
    'hostName': 'Gemeente Heemstede',
    'address': 'Postbus 352',
    'postalCode': '2100 AJ',
    'cityName': 'HEEMSTEDE',
    'emailAddress': 'heemstede@straat.info',
    'phoneNumber': '14 023'
  },
  {
    'hostName': 'Gemeente Heerde',
    'address': 'Postbus 175',
    'postalCode': '8180 AD',
    'cityName': 'HEERDE',
    'emailAddress': 'heerde@straat.info',
    'phoneNumber': '(0578) 69 94 94'
  },
  {
    'hostName': 'Gemeente Heerenveen',
    'address': 'Postbus 15000',
    'postalCode': '8440 GA',
    'cityName': 'HEERENVEEN',
    'emailAddress': 'heerenveen@straat.info',
    'phoneNumber': '(0513) 61 76 17'
  },
  {
    'hostName': 'Gemeente Heerhugowaard',
    'address': 'Postbus 390',
    'postalCode': '1700 AJ',
    'cityName': 'HEERHUGOWAARD',
    'emailAddress': 'heerhugowaard@straat.info',
    'phoneNumber': '14 072'
  },
  {
    'hostName': 'Gemeente Heerlen',
    'address': 'Postbus 1',
    'postalCode': '6400 AA',
    'cityName': 'HEERLEN',
    'emailAddress': 'heerlen@straat.info',
    'phoneNumber': '14 045'
  },
  {
    'hostName': 'Gemeente Heeze-Leende',
    'address': 'Postbus 10000',
    'postalCode': '5590 GA',
    'cityName': 'HEEZE',
    'emailAddress': 'heeze@straat.info',
    'phoneNumber': '(040) 224 14 00'
  },
  {
    'hostName': 'Gemeente Heiloo',
    'address': 'Postbus 1',
    'postalCode': '1850 AA',
    'cityName': 'HEILOO',
    'emailAddress': 'heiloo@straat.info',
    'phoneNumber': '(072) 535 66 66'
  },
  {
    'hostName': 'Gemeente Hellendoorn',
    'address': 'Postbus 200',
    'postalCode': '7440 AE',
    'cityName': 'NIJVERDAL',
    'emailAddress': 'hellendoorn@straat.info',
    'phoneNumber': '(0548) 63 00 00'
  },
  {
    'hostName': 'Gemeente Hellevoetsluis',
    'address': 'Postbus 13',
    'postalCode': '3220 AA',
    'cityName': 'HELLEVOETSLUIS',
    'emailAddress': 'hellevoetsluis@straat.info',
    'phoneNumber': '14 0181'
  },
  {
    'hostName': 'Gemeente Helmond',
    'address': 'Postbus 950',
    'postalCode': '5700 AZ',
    'cityName': 'HELMOND',
    'emailAddress': 'helmond@straat.info',
    'phoneNumber': '140492'
  },
  {
    'hostName': 'Gemeente Hendrik-Ido-Ambacht',
    'address': 'Postbus 34',
    'postalCode': '3340 AA',
    'cityName': 'HENDRIK-IDO-AMBACHT',
    'emailAddress': 'hendrik@straat.info',
    'phoneNumber': '14078'
  },
  {
    'hostName': 'Gemeente Hengelo Ov.',
    'address': 'Postbus 18',
    'postalCode': '7550 AA',
    'cityName': 'HENGELO OV',
    'emailAddress': 'hengelo@straat.info',
    'phoneNumber': '(074) 245 98 76'
  },
  {
    'hostName': 'Gemeente Heumen',
    'address': 'Postbus 200',
    'postalCode': '6580 AZ',
    'cityName': 'MALDEN',
    'emailAddress': 'heumen@straat.info',
    'phoneNumber': '14 024'
  },
  {
    'hostName': 'Gemeente Heusden',
    'address': 'Postbus 41',
    'postalCode': '5250 AA',
    'cityName': 'VLIJMEN',
    'emailAddress': 'heusden@straat.info',
    'phoneNumber': '14 073'
  },
  {
    'hostName': 'Gemeente Hillegom',
    'address': 'Postbus 32',
    'postalCode': '2180 AA',
    'cityName': 'HILLEGOM',
    'emailAddress': 'hillegom@straat.info',
    'phoneNumber': '14 0252'
  },
  {
    'hostName': 'Gemeente Hilvarenbeek',
    'address': 'Postbus 3',
    'postalCode': '5080 AA',
    'cityName': 'HILVARENBEEK',
    'emailAddress': 'hilvarenbeek@straat.info',
    'phoneNumber': '(013) 505 83 83'
  },
  {
    'hostName': 'Gemeente Hilversum',
    'address': 'Postbus 9900',
    'postalCode': '1201 GM',
    'cityName': 'HILVERSUM',
    'emailAddress': 'hilversum@straat.info',
    'phoneNumber': '14035'
  },
  {
    'hostName': 'Gemeente Hof van Twente',
    'address': 'Postbus 54',
    'postalCode': '7470 AB',
    'cityName': 'GOOR',
    'emailAddress': 'hof@straat.info',
    'phoneNumber': '(0547) 85 85 85'
  },
  {
    'hostName': 'Gemeente Hollands Kroon',
    'address': 'Postbus 8',
    'postalCode': '1760 AA',
    'cityName': 'ANNA PAULOWNA',
    'emailAddress': 'hollands@straat.info',
    'phoneNumber': '(088) 321 50 00'
  },
  {
    'hostName': 'Gemeente Hoogeveen',
    'address': 'Postbus 20000',
    'postalCode': '7900 PA',
    'cityName': 'HOOGEVEEN',
    'emailAddress': 'hoogeveen@straat.info',
    'phoneNumber': '14 0528'
  },
  {
    'hostName': 'Gemeente Hoorn',
    'address': 'Postbus 603',
    'postalCode': '1620 AR',
    'cityName': 'HOORN NH',
    'emailAddress': 'hoorn@straat.info',
    'phoneNumber': '(0229) 25 22 00'
  },
  {
    'hostName': 'Gemeente Horst aan de Maas',
    'address': 'Postbus 6005',
    'postalCode': '5960 AA',
    'cityName': 'HORST',
    'emailAddress': 'horst@straat.info',
    'phoneNumber': '(077) 477 97 77'
  },
  {
    'hostName': 'Gemeente Houten',
    'address': 'Postbus 30',
    'postalCode': '3990 DA',
    'cityName': 'HOUTEN',
    'emailAddress': 'houten@straat.info',
    'phoneNumber': '(030) 639 26 11'
  },
  {
    'hostName': 'Gemeente Huizen',
    'address': 'Postbus 5',
    'postalCode': '1270 AA',
    'cityName': 'HUIZEN',
    'emailAddress': 'huizen@straat.info',
    'phoneNumber': '(035) 528 19 11'
  },
  {
    'hostName': 'Gemeente Hulst',
    'address': 'Postbus 49',
    'postalCode': '4560 AA',
    'cityName': 'HULST',
    'emailAddress': 'hulst@straat.info',
    'phoneNumber': '14 0114'
  },
  {
    'hostName': 'Gemeente IJsselstein',
    'address': 'Postbus 26',
    'postalCode': '3400 AA',
    'cityName': 'IJSSELSTEIN UT',
    'emailAddress': 'ijsselstein@straat.info',
    'phoneNumber': '14 030'
  },
  {
    'hostName': 'Gemeente Kaag en Braassem',
    'address': 'Postbus 1',
    'postalCode': '2370 AA',
    'cityName': 'ROELOFARENDSVEEN',
    'emailAddress': 'kaag@straat.info',
    'phoneNumber': '(071) 332 72 72'
  },
  {
    'hostName': 'Gemeente Kampen',
    'address': 'Postbus 5009',
    'postalCode': '8260 GA',
    'cityName': 'KAMPEN',
    'emailAddress': 'kampen@straat.info',
    'phoneNumber': '(038) 339 29 99'
  },
  {
    'hostName': 'Gemeente Kapelle',
    'address': 'Postbus 79',
    'postalCode': '4420 AC',
    'cityName': 'KAPELLE',
    'emailAddress': 'kapelle@straat.info',
    'phoneNumber': '(0113) 33 31 10'
  },
  {
    'hostName': 'Gemeente Katwijk',
    'address': 'Postbus 589',
    'postalCode': '2220 AN',
    'cityName': 'KATWIJK ZH',
    'emailAddress': 'katwijk@straat.info',
    'phoneNumber': '(071) 406 50 00'
  },
  {
    'hostName': 'Gemeente Kerkrade',
    'address': 'Postbus 600',
    'postalCode': '6460 AP',
    'cityName': 'KERKRADE',
    'emailAddress': 'kerkrade@straat.info',
    'phoneNumber': '14 045'
  },
  {
    'hostName': 'Gemeente Koggenland',
    'address': 'Postbus 21',
    'postalCode': '1633 ZG',
    'cityName': 'AVENHORN',
    'emailAddress': 'koggenland@straat.info',
    'phoneNumber': '(0229) 54 84 00'
  },
  {
    'hostName': 'Gemeente Kollumerland c.a.',
    'address': 'Postbus 13',
    'postalCode': '9290 AA',
    'cityName': 'KOLLUM',
    'emailAddress': 'kollumerland@straat.info',
    'phoneNumber': '(0511) 45 88 88'
  },
  {
    'hostName': 'Gemeente Korendijk',
    'address': 'Postbus 3708',
    'postalCode': '3265 ZG',
    'cityName': 'PIERSHIL',
    'emailAddress': 'korendijk@straat.info',
    'phoneNumber': '(0186) 69 77 77'
  },
  {
    'hostName': 'Gemeente Krimpen aan den IJssel',
    'address': 'Postbus 200',
    'postalCode': '2920 AE',
    'cityName': 'KRIMPEN AAN DEN IJSSEL',
    'emailAddress': 'krimpen@straat.info',
    'phoneNumber': '14 0180'
  },
  {
    'hostName': 'Gemeente Krimpenerwaard',
    'address': 'Postbus 51',
    'postalCode': '2820 AB',
    'cityName': 'STOLWIJK',
    'emailAddress': 'krimpenerwaard@straat.info',
    'phoneNumber': '140182'
  },
  {
    'hostName': 'Gemeente Laarbeek',
    'address': 'Postbus 190',
    'postalCode': '5740 AD',
    'cityName': 'BEEK EN DONK',
    'emailAddress': 'laarbeek@straat.info',
    'phoneNumber': '(0492) 46 97 00'
  },
  {
    'hostName': 'Gemeente Landerd',
    'address': 'Postbus 35',
    'postalCode': '5410 AA',
    'cityName': 'ZEELAND',
    'emailAddress': 'landerd@straat.info',
    'phoneNumber': '(0486) 45 81 11'
  },
  {
    'hostName': 'Gemeente Landgraaf',
    'address': 'Postbus 31000',
    'postalCode': '6370 AA',
    'cityName': 'LANDGRAAF',
    'emailAddress': 'landgraaf@straat.info',
    'phoneNumber': '14 045'
  },
  {
    'hostName': 'Gemeente Landsmeer',
    'address': 'Postbus 1',
    'postalCode': '1120 AA',
    'cityName': 'LANDSMEER',
    'emailAddress': 'landsmeer@straat.info',
    'phoneNumber': '(020) 487 71 11'
  },
  {
    'hostName': 'Gemeente Langedijk',
    'address': 'Postbus 15',
    'postalCode': '1723 ZG',
    'cityName': 'NOORD-SCHARWOUDE',
    'emailAddress': 'langedijk@straat.info',
    'phoneNumber': '(0226) 33 44 33'
  },
  {
    'hostName': 'Gemeente Lansingerland',
    'address': 'Postbus 1',
    'postalCode': '2650 AA',
    'cityName': 'BERKEL EN RODENRIJS',
    'emailAddress': 'lansingerland@straat.info',
    'phoneNumber': '14 010'
  },
  {
    'hostName': 'Gemeente Laren',
    'address': 'Postbus 71',
    'postalCode': '3755 ZH',
    'cityName': 'EEMNES',
    'emailAddress': 'laren@straat.info',
    'phoneNumber': '(035) 751 34 44'
  },
  {
    'hostName': 'Gemeente Leek',
    'address': 'Postbus 100',
    'postalCode': '9350 AC',
    'cityName': 'LEEK',
    'emailAddress': 'leek@straat.info',
    'phoneNumber': '(0594) 55 15 15'
  },
  {
    'hostName': 'Gemeente Leerdam',
    'address': 'Postbus 15',
    'postalCode': '4140 AA',
    'cityName': 'LEERDAM',
    'emailAddress': 'leerdam@straat.info',
    'phoneNumber': '(0345) 63 63 63'
  },
  {
    'hostName': 'Gemeente Leeuwarden',
    'address': 'Postbus 21000',
    'postalCode': '8900 JA',
    'cityName': 'LEEUWARDEN',
    'emailAddress': 'leeuwarden@straat.info',
    'phoneNumber': '14 058'
  },
  {
    'hostName': 'Gemeente Leiden',
    'address': 'Postbus 9100',
    'postalCode': '2300 PC',
    'cityName': 'LEIDEN',
    'emailAddress': 'leiden@straat.info',
    'phoneNumber': '14071'
  },
  {
    'hostName': 'Gemeente Leiderdorp',
    'address': 'Postbus 35',
    'postalCode': '2350 AA',
    'cityName': 'LEIDERDORP',
    'emailAddress': 'leiderdorp@straat.info',
    'phoneNumber': '(071) 545 85 00'
  },
  {
    'hostName': 'Gemeente Leidschendam-Voorburg',
    'address': 'Postbus 1005',
    'postalCode': '2260 BA',
    'cityName': 'LEIDSCHENDAM',
    'emailAddress': 'leidschendam@straat.info',
    'phoneNumber': '14070'
  },
  {
    'hostName': 'Gemeente Lelystad',
    'address': 'Postbus 91',
    'postalCode': '8200 AB',
    'cityName': 'LELYSTAD',
    'emailAddress': 'lelystad@straat.info',
    'phoneNumber': '14 03 20'
  },
  {
    'hostName': 'Gemeente Leudal',
    'address': 'Postbus 3008',
    'postalCode': '6093 ZG',
    'cityName': 'HEYTHUYSEN',
    'emailAddress': 'leudal@straat.info',
    'phoneNumber': '(0475) 85 90 00'
  },
  {
    'hostName': 'Gemeente Leusden',
    'address': 'Postbus 150',
    'postalCode': '3830 AD',
    'cityName': 'LEUSDEN',
    'emailAddress': 'leusden@straat.info',
    'phoneNumber': '14 033'
  },
  {
    'hostName': 'Gemeente Lingewaal',
    'address': 'Postbus 1014',
    'postalCode': '4147 ZG',
    'cityName': 'ASPEREN',
    'emailAddress': 'lingewaal@straat.info',
    'phoneNumber': '(0345) 63 40 00'
  },
  {
    'hostName': 'Gemeente Lingewaard',
    'address': 'Postbus 15',
    'postalCode': '6680 AA',
    'cityName': 'BEMMEL',
    'emailAddress': 'lingewaard@straat.info',
    'phoneNumber': '(026) 326 01 11'
  },
  {
    'hostName': 'Gemeente Lisse',
    'address': 'Postbus 200',
    'postalCode': '2160 AE',
    'cityName': 'LISSE',
    'emailAddress': 'lisse@straat.info',
    'phoneNumber': '14 0252'
  },
  {
    'hostName': 'Gemeente Lochem',
    'address': 'Postbus 17',
    'postalCode': '7240 AA',
    'cityName': 'LOCHEM',
    'emailAddress': 'lochem@straat.info',
    'phoneNumber': '(0573) 28 92 22'
  },
  {
    'hostName': 'Gemeente Loon op Zand',
    'address': 'Postbus 7',
    'postalCode': '5170 AA',
    'cityName': 'KAATSHEUVEL',
    'emailAddress': 'loon@straat.info',
    'phoneNumber': '(0416) 28 91 11'
  },
  {
    'hostName': 'Gemeente Lopik',
    'address': 'Postbus 50',
    'postalCode': '3410 CB',
    'cityName': 'LOPIK',
    'emailAddress': 'lopik@straat.info',
    'phoneNumber': '(0348) 55 99 55'
  },
  {
    'hostName': 'Gemeente Loppersum',
    'address': 'Postbus 25',
    'postalCode': '9919 ZG',
    'cityName': 'LOPPERSUM',
    'emailAddress': 'loppersum@straat.info',
    'phoneNumber': '(0596) 54 82 00'
  },
  {
    'hostName': 'Gemeente Losser',
    'address': 'Postbus 90',
    'postalCode': '7580 AB',
    'cityName': 'LOSSER',
    'emailAddress': 'losser@straat.info',
    'phoneNumber': '(053) 537 74 44'
  },
  {
    'hostName': 'Gemeente Maasdriel',
    'address': 'Postbus 10000',
    'postalCode': '5330 GA',
    'cityName': 'KERKDRIEL',
    'emailAddress': 'maasdriel@straat.info',
    'phoneNumber': '14 0418'
  },
  {
    'hostName': 'Gemeente Maasgouw',
    'address': 'Postbus 7000',
    'postalCode': '6050 AA',
    'cityName': 'MAASBRACHT',
    'emailAddress': 'maasgouw@straat.info',
    'phoneNumber': '(0475) 85 25 00'
  },
  {
    'hostName': 'Gemeente Maassluis',
    'address': 'Postbus 55',
    'postalCode': '3140 AB',
    'cityName': 'MAASSLUIS',
    'emailAddress': 'maassluis@straat.info',
    'phoneNumber': '14 010'
  },
  {
    'hostName': 'Gemeente Maastricht',
    'address': 'Postbus 1992',
    'postalCode': '6201 BZ',
    'cityName': 'MAASTRICHT',
    'emailAddress': 'maastricht@straat.info',
    'phoneNumber': '14 043'
  },
  {
    'hostName': 'Gemeente Marum',
    'address': 'Postbus 2',
    'postalCode': '9363 ZG',
    'cityName': 'MARUM',
    'emailAddress': 'marum@straat.info',
    'phoneNumber': '(0594) 64 13 33'
  },
  {
    'hostName': 'Gemeente Medemblik',
    'address': 'Postbus 45',
    'postalCode': '1687 ZG',
    'cityName': 'WOGNUM',
    'emailAddress': 'medemblik@straat.info',
    'phoneNumber': '(0229) 85 60 00'
  },
  {
    'hostName': 'Gemeente Meerssen',
    'address': 'Postbus 90',
    'postalCode': '6230 AB',
    'cityName': 'MEERSSEN',
    'emailAddress': 'meerssen@straat.info',
    'phoneNumber': '14 043'
  },
  {
    'hostName': 'Gemeente Meierijstad',
    'address': 'Postbus 10001',
    'postalCode': '5460 DA',
    'cityName': 'Veghel',
    'emailAddress': 'meierijstad@straat.info',
    'phoneNumber': '14 0413'
  },
  {
    'hostName': 'Gemeente Meppel',
    'address': 'Postbus 501',
    'postalCode': '7940 AM',
    'cityName': 'MEPPEL',
    'emailAddress': 'meppel@straat.info',
    'phoneNumber': '14 0522'
  },
  {
    'hostName': 'Gemeente Middelburg',
    'address': 'Postbus 6000',
    'postalCode': '4330 LA',
    'cityName': 'MIDDELBURG',
    'emailAddress': 'middelburg@straat.info',
    'phoneNumber': '14 0118'
  },
  {
    'hostName': 'Gemeente Midden-Delfland',
    'address': 'Postbus 1',
    'postalCode': '2636 ZG',
    'cityName': 'SCHIPLUIDEN',
    'emailAddress': 'middendelfland@straat.info',
    'phoneNumber': '(015) 380 41 11'
  },
  {
    'hostName': 'Gemeente Midden-Drenthe',
    'address': 'Postbus 24',
    'postalCode': '9410 AA',
    'cityName': 'BEILEN',
    'emailAddress': 'middendrenthe@straat.info',
    'phoneNumber': '(0593) 53 92 22'
  },
  {
    'hostName': 'Gemeente Midden-Groningen',
    'address': 'Postbus 75',
    'postalCode': '9600 AB',
    'cityName': 'HOOGEZAND',
    'emailAddress': 'middengroningen@straat.info',
    'phoneNumber': '(0598) 373737'
  },
  {
    'hostName': 'Gemeente Mill en St. Hubert',
    'address': 'Postbus 7',
    'postalCode': '5360 AA',
    'cityName': 'GRAVE',
    'emailAddress': 'mill@straat.info',
    'phoneNumber': '(0485) 46 03 00'
  },
  {
    'hostName': 'Gemeente Moerdijk',
    'address': 'Postbus 4',
    'postalCode': '4760 AA',
    'cityName': 'ZEVENBERGEN',
    'emailAddress': 'moerdijk@straat.info',
    'phoneNumber': '(0168) 37 36 00'
  },
  {
    'hostName': 'Gemeente Molenwaard',
    'address': 'Postbus 5',
    'postalCode': '2970 AA',
    'cityName': 'BLESKENSGRAAF CA',
    'emailAddress': 'molenwaard@straat.info',
    'phoneNumber': '14 0184'
  },
  {
    'hostName': 'Gemeente Montferland',
    'address': 'Postbus 47',
    'postalCode': '6940 BA',
    'cityName': 'DIDAM',
    'emailAddress': 'montferland@straat.info',
    'phoneNumber': '(0316) 29 13 91'
  },
  {
    'hostName': 'Gemeente Montfoort',
    'address': 'Postbus 41',
    'postalCode': '3417 ZG',
    'cityName': 'MONTFOORT',
    'emailAddress': 'montfoort@straat.info',
    'phoneNumber': '(0348) 47 64 00'
  },
  {
    'hostName': 'Gemeente Mook en Middelaar',
    'address': 'Postbus 200',
    'postalCode': '6585 ZK',
    'cityName': 'MOOK',
    'emailAddress': 'mook@straat.info',
    'phoneNumber': '(024) 696 91 11'
  },
  {
    'hostName': 'Gemeente Neder-Betuwe',
    'address': 'Postbus 20',
    'postalCode': '4043 ZG',
    'cityName': 'OPHEUSDEN',
    'emailAddress': 'neder@straat.info',
    'phoneNumber': '(0488) 44 99 00'
  },
  {
    'hostName': 'Gemeente Nederweert',
    'address': 'Postbus 2728',
    'postalCode': '6030 AA',
    'cityName': 'NEDERWEERT',
    'emailAddress': 'nederweert@straat.info',
    'phoneNumber': '(0495) 67 71 11'
  },
  {
    'hostName': 'Gemeente Neerijnen',
    'address': 'Postbus 30',
    'postalCode': '4180 BA',
    'cityName': 'WAARDENBURG',
    'emailAddress': 'neerijnen@straat.info',
    'phoneNumber': '(0418) 65 65 65'
  },
  {
    'hostName': 'Gemeente Nieuwegein',
    'address': 'Postbus 1',
    'postalCode': '3430 AA',
    'cityName': 'NIEUWEGEIN',
    'emailAddress': 'nieuwegein@straat.info',
    'phoneNumber': '14030'
  },
  {
    'hostName': 'Gemeente Nieuwkoop',
    'address': 'Postbus 1',
    'postalCode': '2460 AA',
    'cityName': 'TER AAR',
    'emailAddress': 'nieuwkoop@straat.info',
    'phoneNumber': '14 0172'
  },
  {
    'hostName': 'Gemeente Nijkerk',
    'address': 'Postbus 1000',
    'postalCode': '3860 BA',
    'cityName': 'NIJKERK GLD',
    'emailAddress': 'nijkerk@straat.info',
    'phoneNumber': '14 033'
  },
  {
    'hostName': 'Gemeente Nijmegen',
    'address': 'Postbus 9105',
    'postalCode': '6500 HG',
    'cityName': 'NIJMEGEN',
    'emailAddress': 'nijmegen@straat.info',
    'phoneNumber': '14-024'
  },
  {
    'hostName': 'Gemeente Nissewaard',
    'address': 'Postbus 25',
    'postalCode': '3200 AA',
    'cityName': 'SPIJKENISSE',
    'emailAddress': 'nissewaard@straat.info',
    'phoneNumber': '14 0181'
  },
  {
    'hostName': 'Gemeente Noord-Beveland',
    'address': 'Postbus 3',
    'postalCode': '4490 AA',
    'cityName': 'WISSENKERKE',
    'emailAddress': 'noord@straat.info',
    'phoneNumber': '(0113) 37 73 77'
  },
  {
    'hostName': 'Gemeente Noordenveld',
    'address': 'Postbus 109',
    'postalCode': '9300 AC',
    'cityName': 'RODEN',
    'emailAddress': 'noordenveld@straat.info',
    'phoneNumber': '14050'
  },
  {
    'hostName': 'Gemeente Noordoostpolder',
    'address': 'Postbus 155',
    'postalCode': '8300 AD',
    'cityName': 'EMMELOORD',
    'emailAddress': 'noordoostpolder@straat.info',
    'phoneNumber': '(0527) 63 39 11'
  },
  {
    'hostName': 'Gemeente Noordwijk',
    'address': 'Postbus 298',
    'postalCode': '2200 AG',
    'cityName': 'NOORDWIJK ZH',
    'emailAddress': 'noordwijk@straat.info',
    'phoneNumber': '(071) 366 00 00'
  },
  {
    'hostName': 'Gemeente Noordwijkerhout',
    'address': 'Postbus 13',
    'postalCode': '2210 AA',
    'cityName': 'NOORDWIJKERHOUT',
    'emailAddress': 'noordwijkerhout@straat.info',
    'phoneNumber': '(0252) 34 37 37'
  },
  {
    'hostName': 'Gemeente Nuenen c.a.',
    'address': 'Postbus 10000',
    'postalCode': '5670 GA',
    'cityName': 'NUENEN',
    'emailAddress': 'nuenen@straat.info',
    'phoneNumber': '(040) 263 16 31'
  },
  {
    'hostName': 'Gemeente Nunspeet',
    'address': 'Postbus 79',
    'postalCode': '8070 AB',
    'cityName': 'NUNSPEET',
    'emailAddress': 'nunspeet@straat.info',
    'phoneNumber': '(0341) 25 99 11'
  },
  {
    'hostName': 'Gemeente Nuth',
    'address': 'Postbus 22000',
    'postalCode': '6360 AA',
    'cityName': 'NUTH',
    'emailAddress': 'nuth@straat.info',
    'phoneNumber': '14045'
  },
  {
    'hostName': 'Gemeente Oegstgeest',
    'address': 'Postbus 1270',
    'postalCode': '2340 BG',
    'cityName': 'OEGSTGEEST',
    'emailAddress': 'oegstgeest@straat.info',
    'phoneNumber': '(071) 519 17 93'
  },
  {
    'hostName': 'Gemeente Oirschot',
    'address': 'Postbus 11',
    'postalCode': '5688 ZG',
    'cityName': 'OIRSCHOT',
    'emailAddress': 'oirschot@straat.info',
    'phoneNumber': '(0499) 58 33 33'
  },
  {
    'hostName': 'Gemeente Oisterwijk',
    'address': 'Postbus 10101',
    'postalCode': '5060 GA',
    'cityName': 'OISTERWIJK',
    'emailAddress': 'oisterwijk@straat.info',
    'phoneNumber': '(013) 529 13 11'
  },
  {
    'hostName': 'Gemeente Oldambt',
    'address': 'Postbus 175',
    'postalCode': '9670 AD',
    'cityName': 'WINSCHOTEN',
    'emailAddress': 'oldambt@straat.info',
    'phoneNumber': '(0597) 48 20 00'
  },
  {
    'hostName': 'Gemeente Oldebroek',
    'address': 'Postbus 2',
    'postalCode': '8096 ZG',
    'cityName': 'OLDEBROEK',
    'emailAddress': 'oldebroek@straat.info',
    'phoneNumber': '14 0525'
  },
  {
    'hostName': 'Gemeente Oldenzaal',
    'address': 'Postbus 354',
    'postalCode': '7570 AJ',
    'cityName': 'OLDENZAAL',
    'emailAddress': 'oldenzaal@straat.info',
    'phoneNumber': '(0541) 58 81 11'
  },
  {
    'hostName': 'Gemeente Olst-Wijhe',
    'address': 'Postbus 23',
    'postalCode': '8130 AA',
    'cityName': 'WIJHE',
    'emailAddress': 'olst@straat.info',
    'phoneNumber': '14 0570'
  },
  {
    'hostName': 'Gemeente Ommen',
    'address': 'Postbus 100',
    'postalCode': '7730 AC',
    'cityName': 'OMMEN',
    'emailAddress': 'ommen@straat.info',
    'phoneNumber': '(0529) 45 91 00'
  },
  {
    'hostName': 'Gemeente Onderbanken',
    'address': 'Postbus 1090',
    'postalCode': '6450 CB',
    'cityName': 'SCHINVELD',
    'emailAddress': 'onderbanken@straat.info',
    'phoneNumber': '(045) 527 87 87'
  },
  {
    'hostName': 'Gemeente Oost Gelre',
    'address': 'Postbus 17',
    'postalCode': '7130 AA',
    'cityName': 'LICHTENVOORDE',
    'emailAddress': 'oost@straat.info',
    'phoneNumber': '(0544) 39 35 35'
  },
  {
    'hostName': 'Gemeente Oosterhout',
    'address': 'Postbus 10150',
    'postalCode': '4900 GB',
    'cityName': 'OOSTERHOUT NB',
    'emailAddress': 'oosterhout@straat.info',
    'phoneNumber': '14 0162'
  },
  {
    'hostName': 'Gemeente Ooststellingwerf',
    'address': 'Postbus 38',
    'postalCode': '8430 AA',
    'cityName': 'OOSTERWOLDE FR',
    'emailAddress': 'ooststellingwerf@straat.info',
    'phoneNumber': '(0516) 56 62 22'
  },
  {
    'hostName': 'Gemeente Oostzaan',
    'address': 'Postbus 20',
    'postalCode': '1530 AA',
    'cityName': 'WORMER',
    'emailAddress': 'oostzaan@straat.info',
    'phoneNumber': '(075) 651 21 00'
  },
  {
    'hostName': 'Gemeente Opmeer',
    'address': 'Postbus 199',
    'postalCode': '1715 ZK',
    'cityName': 'SPANBROEK',
    'emailAddress': 'opmeer@straat.info',
    'phoneNumber': '(0226) 36 33 33'
  },
  {
    'hostName': 'Gemeente Opsterland',
    'address': 'Postbus 10000',
    'postalCode': '9244 ZP',
    'cityName': 'BEETSTERZWAAG',
    'emailAddress': 'opsterland@straat.info',
    'phoneNumber': '(0512) 38 62 22'
  },
  {
    'hostName': 'Gemeente Oss',
    'address': 'Postbus 5',
    'postalCode': '5340 BA',
    'cityName': 'OSS',
    'emailAddress': 'oss@straat.info',
    'phoneNumber': '14 0412'
  },
  {
    'hostName': 'Gemeente Oud-Beijerland',
    'address': 'Postbus 2003',
    'postalCode': '3260 EA',
    'cityName': 'OUD-BEIJERLAND',
    'emailAddress': 'oud@straat.info',
    'phoneNumber': '(0186) 64 65 66'
  },
  {
    'hostName': 'Gemeente Oude IJsselstreek',
    'address': 'Postbus 42',
    'postalCode': '7080 AA',
    'cityName': 'GENDRINGEN',
    'emailAddress': 'oude@straat.info',
    'phoneNumber': '(0315) 29 22 92'
  },
  {
    'hostName': 'Gemeente Ouder-Amstel',
    'address': 'Postbus 35',
    'postalCode': '1190 AA',
    'cityName': 'OUDERKERK AAN DE AMSTEL',
    'emailAddress': 'ouder@straat.info',
    'phoneNumber': '(020) 496 21 21'
  },
  {
    'hostName': 'Gemeente Oudewater',
    'address': 'Postbus 100',
    'postalCode': '3420 DC',
    'cityName': 'OUDEWATER',
    'emailAddress': 'oudewater@straat.info',
    'phoneNumber': '(0348) 56 69 99'
  },
  {
    'hostName': 'Gemeente Overbetuwe',
    'address': 'Postbus 11',
    'postalCode': '6660 AA',
    'cityName': 'ELST GLD',
    'emailAddress': 'overbetuwe@straat.info',
    'phoneNumber': '(0481) 36 23 00'
  },
  {
    'hostName': 'Gemeente Papendrecht',
    'address': 'Postbus 11',
    'postalCode': '3350 AA',
    'cityName': 'PAPENDRECHT',
    'emailAddress': 'papendrecht@straat.info',
    'phoneNumber': '14078'
  },
  {
    'hostName': 'Gemeente Peel en Maas',
    'address': 'Postbus 7088',
    'postalCode': '5980 AB',
    'cityName': 'PANNINGEN',
    'emailAddress': 'peel@straat.info',
    'phoneNumber': '(077) 306 66 66'
  },
  {
    'hostName': 'Gemeente Pekela',
    'address': 'Postbus 20000',
    'postalCode': '9665 ZM',
    'cityName': 'OUDE PEKELA',
    'emailAddress': 'pekela@straat.info',
    'phoneNumber': '(0597) 61 75 55'
  },
  {
    'hostName': 'Gemeente Pijnacker-Nootdorp',
    'address': 'Postbus 1',
    'postalCode': '2640 AA',
    'cityName': 'PIJNACKER',
    'emailAddress': 'pijnacker@straat.info',
    'phoneNumber': '14 015'
  },
  {
    'hostName': 'Gemeente Purmerend',
    'address': 'Postbus 15',
    'postalCode': '1440 AA',
    'cityName': 'PURMEREND',
    'emailAddress': 'purmerend@straat.info',
    'phoneNumber': '(0299) 45 24 52'
  },
  {
    'hostName': 'Gemeente Putten',
    'address': 'Postbus 400',
    'postalCode': '3880 AK',
    'cityName': 'PUTTEN',
    'emailAddress': 'putten@straat.info',
    'phoneNumber': '(0341) 35 96 11'
  },
  {
    'hostName': 'Gemeente Raalte',
    'address': 'Postbus 140',
    'postalCode': '8100 AC',
    'cityName': 'RAALTE',
    'emailAddress': 'raalte@straat.info',
    'phoneNumber': '(0572) 34 77 99'
  },
  {
    'hostName': 'Gemeente Reimerswaal',
    'address': 'Postbus 70',
    'postalCode': '4416 ZH',
    'cityName': 'KRUININGEN',
    'emailAddress': 'reimerswaal@straat.info',
    'phoneNumber': '140113'
  },
  {
    'hostName': 'Gemeente Renkum',
    'address': 'Postbus 9100',
    'postalCode': '6860 HA',
    'cityName': 'OOSTERBEEK',
    'emailAddress': 'renkum@straat.info',
    'phoneNumber': '(026) 334 81 11'
  },
  {
    'hostName': 'Gemeente Renswoude',
    'address': 'Postbus 8',
    'postalCode': '3927 ZL',
    'cityName': 'RENSWOUDE',
    'emailAddress': 'renswoude@straat.info',
    'phoneNumber': '(0318) 57 81 50'
  },
  {
    'hostName': 'Gemeente Reusel-De Mierden',
    'address': 'Postbus 11',
    'postalCode': '5540 AA',
    'cityName': 'REUSEL',
    'emailAddress': 'reusel@straat.info',
    'phoneNumber': '(0497) 65 06 50'
  },
  {
    'hostName': 'Gemeente Rheden',
    'address': 'Postbus 9110',
    'postalCode': '6994 ZJ',
    'cityName': 'DE STEEG',
    'emailAddress': 'rheden@straat.info',
    'phoneNumber': '(026) 497 69 11'
  },
  {
    'hostName': 'Gemeente Rhenen',
    'address': 'Postbus 201',
    'postalCode': '3910 AE',
    'cityName': 'RHENEN',
    'emailAddress': 'rhenen@straat.info',
    'phoneNumber': '(0317) 68 16 81'
  },
  {
    'hostName': 'Gemeente Ridderkerk',
    'address': 'Postbus 271',
    'postalCode': '2980 AG',
    'cityName': 'RIDDERKERK',
    'emailAddress': 'ridderkerk@straat.info',
    'phoneNumber': '(0180) 45 12 34'
  },
  {
    'hostName': 'Gemeente Rijssen-Holten',
    'address': 'Postbus 244',
    'postalCode': '7460 AE',
    'cityName': 'RIJSSEN',
    'emailAddress': 'rijssen@straat.info',
    'phoneNumber': '(0548) 85 48 54'
  },
  {
    'hostName': 'Gemeente Rijswijk',
    'address': 'Postbus 5305',
    'postalCode': '2280 HH',
    'cityName': 'RIJSWIJK ZH',
    'emailAddress': 'rijswijk@straat.info',
    'phoneNumber': '14070'
  },
  {
    'hostName': 'Gemeente Roerdalen',
    'address': 'Postbus 6099',
    'postalCode': '6077 ZH',
    'cityName': 'SINT ODILIENBERG',
    'emailAddress': 'roerdalen@straat.info',
    'phoneNumber': '(0475) 53 88 88'
  },
  {
    'hostName': 'Gemeente Roermond',
    'address': 'Postbus 900',
    'postalCode': '6040 AX',
    'cityName': 'ROERMOND',
    'emailAddress': 'roermond@straat.info',
    'phoneNumber': '14 0475'
  },
  {
    'hostName': 'Gemeente Roosendaal',
    'address': 'Postbus 5000',
    'postalCode': '4700 KA',
    'cityName': 'ROOSENDAAL',
    'emailAddress': 'roosendaal@straat.info',
    'phoneNumber': '(0165) 57 91 11'
  },
  {
    'hostName': 'Gemeente Rotterdam',
    'address': 'Postbus 70012',
    'postalCode': '3000 KP',
    'cityName': 'ROTTERDAM',
    'emailAddress': 'rotterdam@straat.info',
    'phoneNumber': '14 010'
  },
  {
    'hostName': 'Gemeente Rozendaal',
    'address': 'Postbus 9106',
    'postalCode': '6880 HH',
    'cityName': 'VELP GLD',
    'emailAddress': 'rozendaal@straat.info',
    'phoneNumber': '(026) 384 36 66'
  },
  {
    'hostName': 'Gemeente Rucphen',
    'address': 'Postbus 9',
    'postalCode': '4715 ZG',
    'cityName': 'RUCPHEN',
    'emailAddress': 'rucphen@straat.info',
    'phoneNumber': '(0165) 34 95 00'
  },
  {
    'hostName': 'Gemeente Schagen',
    'address': 'Postbus 8',
    'postalCode': '1740 AA',
    'cityName': 'SCHAGEN',
    'emailAddress': 'schagen@straat.info',
    'phoneNumber': '(0224) 21 04 00'
  },
  {
    'hostName': 'Gemeente Scherpenzeel',
    'address': 'Postbus 100',
    'postalCode': '3925 ZJ',
    'cityName': 'SCHERPENZEEL GLD',
    'emailAddress': 'scherpenzeel@straat.info',
    'phoneNumber': '(033) 277 23 24'
  },
  {
    'hostName': 'Gemeente Schiedam',
    'address': 'Postbus 1501',
    'postalCode': '3100 EA',
    'cityName': 'SCHIEDAM',
    'emailAddress': 'schiedam@straat.info',
    'phoneNumber': '14 010'
  },
  {
    'hostName': 'Gemeente Schiermonnikoog',
    'address': 'Postbus 20',
    'postalCode': '9166 ZP',
    'cityName': 'SCHIERMONNIKOOG',
    'emailAddress': 'schiermonnikoog@straat.info',
    'phoneNumber': '(0519) 53 50 50'
  },
  {
    'hostName': 'Gemeente Schinnen',
    'address': 'Postbus 50',
    'postalCode': '6365 ZH',
    'cityName': 'SCHINNEN',
    'emailAddress': 'schinnen@straat.info',
    'phoneNumber': '14 046'
  },
  {
    'hostName': 'Gemeente Schouwen-Duiveland',
    'address': 'Postbus 5555',
    'postalCode': '4300 JA',
    'cityName': 'ZIERIKZEE',
    'emailAddress': 'schouwen@straat.info',
    'phoneNumber': '(0111) 45 20 00'
  },
  {
    'hostName': "Gemeente 's-Hertogenbosch",
    'address': 'Postbus 12345',
    'postalCode': '5200 GZ',
    'cityName': "'S-HERTOGENBOSCH",
    'emailAddress': 'denbosch@straat.info',
    'phoneNumber': '(073) 615 51 55'
  },
  {
    'hostName': 'Gemeente Simpelveld',
    'address': 'Postbus 21000',
    'postalCode': '6369 ZG',
    'cityName': 'SIMPELVELD',
    'emailAddress': 'simpelveld@straat.info',
    'phoneNumber': '14 045'
  },
  {
    'hostName': 'Gemeente Sint Anthonis',
    'address': 'Postbus 40',
    'postalCode': '5845 ZG',
    'cityName': 'SINT ANTHONIS',
    'emailAddress': 'sintanthonis@straat.info',
    'phoneNumber': '(0485) 38 88 88'
  },
  {
    'hostName': 'Gemeente Sint-Michielsgestel',
    'address': 'Postbus 10000',
    'postalCode': '5270 GA',
    'cityName': 'SINT-MICHIELSGESTEL',
    'emailAddress': 'sintmichielsgestel@straat.info',
    'phoneNumber': '(073) 553 11 11'
  },
  {
    'hostName': 'Gemeente Sittard-Geleen',
    'address': 'Postbus 18',
    'postalCode': '6130 AA',
    'cityName': 'SITTARD',
    'emailAddress': 'sittard@straat.info',
    'phoneNumber': '14 046'
  },
  {
    'hostName': 'Gemeente Sliedrecht',
    'address': 'Postbus 16',
    'postalCode': '3360 AA',
    'cityName': 'SLIEDRECHT',
    'emailAddress': 'sliedrecht@straat.info',
    'phoneNumber': '(0184) 49 59 00'
  },
  {
    'hostName': 'Gemeente Sluis',
    'address': 'Postbus 27',
    'postalCode': '4500 AA',
    'cityName': 'OOSTBURG',
    'emailAddress': 'sluis@straat.info',
    'phoneNumber': '(0117) 45 70 00'
  },
  {
    'hostName': 'Gemeente Smallingerland',
    'address': 'Postbus 10000',
    'postalCode': '9200 HA',
    'cityName': 'DRACHTEN',
    'emailAddress': 'smallingerland@straat.info',
    'phoneNumber': '(0512) 58 12 34'
  },
  {
    'hostName': 'Gemeente Soest',
    'address': 'Postbus 2000',
    'postalCode': '3760 CA',
    'cityName': 'SOEST',
    'emailAddress': 'soest@straat.info',
    'phoneNumber': '(035) 609 34 11'
  },
  {
    'hostName': 'Gemeente Someren',
    'address': 'Postbus 290',
    'postalCode': '5710 AG',
    'cityName': 'SOMEREN',
    'emailAddress': 'someren@straat.info',
    'phoneNumber': '(0493) 49 48 88'
  },
  {
    'hostName': 'Gemeente Son en Breugel',
    'address': 'Postbus 8',
    'postalCode': '5690 AA',
    'cityName': 'SON EN BREUGEL',
    'emailAddress': 'son@straat.info',
    'phoneNumber': '(0499) 49 14 91'
  },
  {
    'hostName': 'Gemeente Stadskanaal',
    'address': 'Postbus 140',
    'postalCode': '9500 AC',
    'cityName': 'STADSKANAAL',
    'emailAddress': 'stadskanaal@straat.info',
    'phoneNumber': '(0599) 63 16 31'
  },
  {
    'hostName': 'Gemeente Staphorst',
    'address': 'Postbus 2',
    'postalCode': '7950 AA',
    'cityName': 'STAPHORST',
    'emailAddress': 'staphorst@straat.info',
    'phoneNumber': '(0522) 46 74 00'
  },
  {
    'hostName': 'Gemeente Stede Broec',
    'address': 'Postbus 20',
    'postalCode': '1610 AA',
    'cityName': 'BOVENKARSPEL',
    'emailAddress': 'stede@straat.info',
    'phoneNumber': '(0228) 51 01 11'
  },
  {
    'hostName': 'Gemeente Steenbergen',
    'address': 'Postbus 6',
    'postalCode': '4650 AA',
    'cityName': 'STEENBERGEN NB',
    'emailAddress': 'steenbergen@straat.info',
    'phoneNumber': '140167'
  },
  {
    'hostName': 'Gemeente Steenwijkerland',
    'address': 'Postbus 162',
    'postalCode': '8330 AD',
    'cityName': 'STEENWIJK',
    'emailAddress': 'steenwijkerland@straat.info',
    'phoneNumber': '14 0521'
  },
  {
    'hostName': 'Gemeente Stein',
    'address': 'Postbus 15',
    'postalCode': '6170 AA',
    'cityName': 'STEIN LB',
    'emailAddress': 'stein@straat.info',
    'phoneNumber': '(046) 435 93 93'
  },
  {
    'hostName': 'Gemeente Stichtse Vecht',
    'address': 'Postbus 1212',
    'postalCode': '3600 BE',
    'cityName': 'MAARSSEN',
    'emailAddress': 'stichtse@straat.info',
    'phoneNumber': '(0346) 25 40 00'
  },
  {
    'hostName': 'Gemeente Strijen',
    'address': 'Postbus 5881',
    'postalCode': '3290 EA',
    'cityName': 'STRIJEN',
    'emailAddress': 'strijen@straat.info',
    'phoneNumber': '(078) 674 82 00'
  },
  {
    'hostName': 'Gemeente Súdwest Fryslân',
    'address': 'Postbus 10000',
    'postalCode': '8600 HA',
    'cityName': 'SNEEK',
    'emailAddress': 'súdwest@straat.info',
    'phoneNumber': '(0515) 48 90 00'
  },
  {
    'hostName': 'Gemeente Ten Boer',
    'address': 'Postbus 7',
    'postalCode': '9790 AA',
    'cityName': 'TEN BOER',
    'emailAddress': 'ten@straat.info',
    'phoneNumber': '(050) 302 88 88'
  },
  {
    'hostName': 'Gemeente Terneuzen',
    'address': 'Postbus 35',
    'postalCode': '4530 AA',
    'cityName': 'TERNEUZEN',
    'emailAddress': 'terneuzen@straat.info',
    'phoneNumber': '140115'
  },
  {
    'hostName': 'Gemeente Terschelling',
    'address': 'Postbus 14',
    'postalCode': '8880 AA',
    'cityName': 'WEST-TERSCHELLING',
    'emailAddress': 'terschelling@straat.info',
    'phoneNumber': '(0562) 44 62 44'
  },
  {
    'hostName': 'Gemeente Texel',
    'address': 'Postbus 200',
    'postalCode': '1790 AE',
    'cityName': 'DEN BURG',
    'emailAddress': 'texel@straat.info',
    'phoneNumber': '140222'
  },
  {
    'hostName': 'Gemeente Teylingen',
    'address': 'Postbus 149',
    'postalCode': '2215 ZJ',
    'cityName': 'VOORHOUT',
    'emailAddress': 'teylingen@straat.info',
    'phoneNumber': '(0252) 78 33 00'
  },
  {
    'hostName': 'Gemeente Tholen',
    'address': 'Postbus 51',
    'postalCode': '4690 AB',
    'cityName': 'THOLEN',
    'emailAddress': 'tholen@straat.info',
    'phoneNumber': '14 0166'
  },
  {
    'hostName': 'Gemeente Tiel',
    'address': 'Postbus 6325',
    'postalCode': '4000 HH',
    'cityName': 'TIEL',
    'emailAddress': 'tiel@straat.info',
    'phoneNumber': '(0344) 63 71 11'
  },
  {
    'hostName': 'Gemeente Tilburg',
    'address': 'Postbus 90155',
    'postalCode': '5000 LH',
    'cityName': 'TILBURG',
    'emailAddress': 'tilburg@straat.info',
    'phoneNumber': '14 013'
  },
  {
    'hostName': 'Gemeente Tubbergen',
    'address': 'Postbus 30',
    'postalCode': '7650 AA',
    'cityName': 'TUBBERGEN',
    'emailAddress': 'tubbergen@straat.info',
    'phoneNumber': '(0546) 62 80 00'
  },
  {
    'hostName': 'Gemeente Twenterand',
    'address': 'Postbus 67',
    'postalCode': '7670 AB',
    'cityName': 'VRIEZENVEEN',
    'emailAddress': 'twenterand@straat.info',
    'phoneNumber': '(0546) 84 08 40'
  },
  {
    'hostName': 'Gemeente Tynaarlo',
    'address': 'Postbus 5',
    'postalCode': '9480 AA',
    'cityName': 'VRIES',
    'emailAddress': 'tynaarlo@straat.info',
    'phoneNumber': '(0592) 26 66 62'
  },
  {
    'hostName': 'Gemeente Tytsjerksteradiel',
    'address': 'Postbus 3',
    'postalCode': '9250 AA',
    'cityName': 'BURGUM',
    'emailAddress': 'tytsjerksteradiel@straat.info',
    'phoneNumber': '(0511) 46 08 60'
  },
  {
    'hostName': 'Gemeente Uden',
    'address': 'Postbus 83',
    'postalCode': '5400 AB',
    'cityName': 'UDEN',
    'emailAddress': 'uden@straat.info',
    'phoneNumber': '140413'
  },
  {
    'hostName': 'Gemeente Uitgeest',
    'address': 'Postbus 7',
    'postalCode': '1910 AA',
    'cityName': 'UITGEEST',
    'emailAddress': 'uitgeest@straat.info',
    'phoneNumber': '14 0251'
  },
  {
    'hostName': 'Gemeente Uithoorn',
    'address': 'Postbus 8',
    'postalCode': '1420 AA',
    'cityName': 'UITHOORN',
    'emailAddress': 'uithoorn@straat.info',
    'phoneNumber': '(0297) 51 31 11'
  },
  {
    'hostName': 'Gemeente Urk',
    'address': 'Postbus 77',
    'postalCode': '8320 AB',
    'cityName': 'URK',
    'emailAddress': 'urk@straat.info',
    'phoneNumber': '(0527) 68 98 68'
  },
  {
    'hostName': 'Gemeente Utrecht',
    'address': 'Postbus 16200',
    'postalCode': '3500 CE',
    'cityName': 'UTRECHT',
    'emailAddress': 'utrecht@straat.info',
    'phoneNumber': '(030) 286 00 00'
  },
  {
    'hostName': 'Gemeente Utrechtse Heuvelrug',
    'address': 'Postbus 200',
    'postalCode': '3940 AE',
    'cityName': 'DOORN',
    'emailAddress': 'utrechtse@straat.info',
    'phoneNumber': '(0343) 56 56 00'
  },
  {
    'hostName': 'Gemeente Vaals',
    'address': 'Postbus 450',
    'postalCode': '6290 AL',
    'cityName': 'VAALS',
    'emailAddress': 'vaals@straat.info',
    'phoneNumber': '(043) 306 85 68'
  },
  {
    'hostName': 'Gemeente Valkenburg aan de Geul',
    'address': 'Postbus 998',
    'postalCode': '6300 AZ',
    'cityName': 'VALKENBURG LB',
    'emailAddress': 'valkenburg@straat.info',
    'phoneNumber': '14 043'
  },
  {
    'hostName': 'Gemeente Valkenswaard',
    'address': 'Postbus 10100',
    'postalCode': '5550 GA',
    'cityName': 'VALKENSWAARD',
    'emailAddress': 'valkenswaard@straat.info',
    'phoneNumber': '(040) 208 34 44'
  },
  {
    'hostName': 'Gemeente Veendam',
    'address': 'Postbus 20004',
    'postalCode': '9640 PA',
    'cityName': 'VEENDAM',
    'emailAddress': 'veendam@straat.info',
    'phoneNumber': '(0598) 65 22 22'
  },
  {
    'hostName': 'Gemeente Veenendaal',
    'address': 'Postbus 1100',
    'postalCode': '3900 BC',
    'cityName': 'VEENENDAAL',
    'emailAddress': 'veenendaal@straat.info',
    'phoneNumber': '(0318) 53 85 38'
  },
  {
    'hostName': 'Gemeente Veere',
    'address': 'Postbus 1000',
    'postalCode': '4357 ZV',
    'cityName': 'DOMBURG',
    'emailAddress': 'veere@straat.info',
    'phoneNumber': '(0118) 55 54 44'
  },
  {
    'hostName': 'Gemeente Veldhoven',
    'address': 'Postbus 10101',
    'postalCode': '5500 GA',
    'cityName': 'VELDHOVEN',
    'emailAddress': 'veldhoven@straat.info',
    'phoneNumber': '(040) 258 44 11'
  },
  {
    'hostName': 'Gemeente Velsen',
    'address': 'Postbus 465',
    'postalCode': '1970 AL',
    'cityName': 'IJMUIDEN',
    'emailAddress': 'velsen@straat.info',
    'phoneNumber': '(0255) 56 72 00'
  },
  {
    'hostName': 'Gemeente Venlo',
    'address': 'Postbus 3434',
    'postalCode': '5902 RK',
    'cityName': 'VENLO',
    'emailAddress': 'venlo@straat.info',
    'phoneNumber': '14 077'
  },
  {
    'hostName': 'Gemeente Venray',
    'address': 'Postbus 500',
    'postalCode': '5800 AM',
    'cityName': 'VENRAY',
    'emailAddress': 'venray@straat.info',
    'phoneNumber': '(0478) 52 33 33'
  },
  {
    'hostName': 'Gemeente Vianen',
    'address': 'Postbus 46',
    'postalCode': '4130 EA',
    'cityName': 'VIANEN UT',
    'emailAddress': 'vianen@straat.info',
    'phoneNumber': '(0347) 36 99 11'
  },
  {
    'hostName': 'Gemeente Vlaardingen',
    'address': 'Postbus 1002',
    'postalCode': '3130 EB',
    'cityName': 'VLAARDINGEN',
    'emailAddress': 'vlaardingen@straat.info',
    'phoneNumber': '(010) 248 40 00'
  },
  {
    'hostName': 'Gemeente Vlieland',
    'address': 'Postbus 10',
    'postalCode': '8899 ZN',
    'cityName': 'VLIELAND',
    'emailAddress': 'vlieland@straat.info',
    'phoneNumber': '(0562) 45 27 00'
  },
  {
    'hostName': 'Gemeente Vlissingen',
    'address': 'Postbus 3000',
    'postalCode': '4380 GV',
    'cityName': 'VLISSINGEN',
    'emailAddress': 'vlissingen@straat.info',
    'phoneNumber': '(0118) 48 70 00'
  },
  {
    'hostName': 'Gemeente Voerendaal',
    'address': 'Postbus 23000',
    'postalCode': '6367 ZG',
    'cityName': 'VOERENDAAL',
    'emailAddress': 'voerendaal@straat.info',
    'phoneNumber': '(045) 575 33 99'
  },
  {
    'hostName': 'Gemeente Voorschoten',
    'address': 'Postbus 393',
    'postalCode': '2250 AJ',
    'cityName': 'VOORSCHOTEN',
    'emailAddress': 'voorschoten@straat.info',
    'phoneNumber': '(071) 560 06 00'
  },
  {
    'hostName': 'Gemeente Voorst',
    'address': 'Postbus 9000',
    'postalCode': '7390 HA',
    'cityName': 'TWELLO',
    'emailAddress': 'voorst@straat.info',
    'phoneNumber': '(0571) 27 99 11'
  },
  {
    'hostName': 'Gemeente Vught',
    'address': 'Postbus 10100',
    'postalCode': '5260 GA',
    'cityName': 'VUGHT',
    'emailAddress': 'vught@straat.info',
    'phoneNumber': '(073) 658 06 80'
  },
  {
    'hostName': 'Gemeente Waadhoeke',
    'address': 'Postbus 58',
    'postalCode': '8800 AB ',
    'cityName': 'FRANEKER',
    'emailAddress': 'franeker@straat.info ',
    'phoneNumber': '(0517) 380380'
  },
  {
    'hostName': 'Gemeente Waalre',
    'address': 'Postbus 10000',
    'postalCode': '5580 GA',
    'cityName': 'WAALRE',
    'emailAddress': 'waalre@straat.info',
    'phoneNumber': '(040) 228 25 00'
  },
  {
    'hostName': 'Gemeente Waalwijk',
    'address': 'Postbus 10150',
    'postalCode': '5140 GB',
    'cityName': 'WAALWIJK',
    'emailAddress': 'waalwijk@straat.info',
    'phoneNumber': '(0416) 68 34 56'
  },
  {
    'hostName': 'Gemeente Waddinxveen',
    'address': 'Postbus 400',
    'postalCode': '2740 AK',
    'cityName': 'WADDINXVEEN',
    'emailAddress': 'waddinxveen@straat.info',
    'phoneNumber': '14 0182'
  },
  {
    'hostName': 'Gemeente Wageningen',
    'address': 'Postbus 1',
    'postalCode': '6700 AA',
    'cityName': 'WAGENINGEN',
    'emailAddress': 'wageningen@straat.info',
    'phoneNumber': '(0317) 49 29 11'
  },
  {
    'hostName': 'Gemeente Wassenaar',
    'address': 'Postbus 499',
    'postalCode': '2240 AL',
    'cityName': 'WASSENAAR',
    'emailAddress': 'wassenaar@straat.info',
    'phoneNumber': '(070) 512 22 22'
  },
  {
    'hostName': 'Gemeente Waterland',
    'address': 'Postbus 1000',
    'postalCode': '1140 BA',
    'cityName': 'MONNICKENDAM',
    'emailAddress': 'waterland@straat.info',
    'phoneNumber': '(0299) 65 85 85'
  },
  {
    'hostName': 'Gemeente Weert',
    'address': 'Postbus 950',
    'postalCode': '6000 AZ',
    'cityName': 'WEERT',
    'emailAddress': 'weert@straat.info',
    'phoneNumber': '(0495) 57 50 00'
  },
  {
    'hostName': 'Gemeente Weesp',
    'address': 'Postbus 5099',
    'postalCode': '1380 GB',
    'cityName': 'WEESP',
    'emailAddress': 'weesp@straat.info',
    'phoneNumber': '(0294) 49 13 91'
  },
  {
    'hostName': 'Gemeente Werkendam',
    'address': 'Postbus 16',
    'postalCode': '4250 DA',
    'cityName': 'WERKENDAM',
    'emailAddress': 'werkendam@straat.info',
    'phoneNumber': '(0183) 50 72 00'
  },
  {
    'hostName': 'Gemeente West Maas en Waal',
    'address': 'Postbus 1',
    'postalCode': '6658 ZG',
    'cityName': 'BENEDEN-LEEUWEN',
    'emailAddress': 'west@straat.info',
    'phoneNumber': '14 0487'
  },
  {
    'hostName': 'Gemeente Westerveld',
    'address': 'Postbus 50',
    'postalCode': '7970 AB',
    'cityName': 'HAVELTE',
    'emailAddress': 'westerveld@straat.info',
    'phoneNumber': '(0521) 34 93 49'
  },
  {
    'hostName': 'Gemeente Westervoort',
    'address': 'Postbus 40',
    'postalCode': '6930 AA',
    'cityName': 'WESTERVOORT',
    'emailAddress': 'westervoort@straat.info',
    'phoneNumber': '(026) 317 99 11'
  },
  {
    'hostName': 'Gemeente Westland',
    'address': 'Postbus 150',
    'postalCode': '2670 AD',
    'cityName': 'NAALDWIJK',
    'emailAddress': 'westland@straat.info',
    'phoneNumber': '14 0174'
  },
  {
    'hostName': 'Gemeente Weststellingwerf',
    'address': 'Postbus 60',
    'postalCode': '8470 AB',
    'cityName': 'WOLVEGA',
    'emailAddress': 'weststellingwerf@straat.info',
    'phoneNumber': '140561'
  },
  {
    'hostName': 'Gemeente Westvoorne',
    'address': 'Postbus 550',
    'postalCode': '3235 ZH',
    'cityName': 'ROCKANJE',
    'emailAddress': 'westvoorne@straat.info',
    'phoneNumber': '(0181) 40 80 00'
  },
  {
    'hostName': 'Gemeente Westerwolde',
    'address': 'Postbus 14',
    'postalCode': '9550 AA',
    'cityName': 'SELLINGEN',
    'emailAddress': 'westerwolde@straat.info',
    'phoneNumber': '(0599) 32 02 20'
  },
  {
    'hostName': 'Gemeente Wierden',
    'address': 'Postbus 43',
    'postalCode': '7640 AA',
    'cityName': 'WIERDEN',
    'emailAddress': 'wierden@straat.info',
    'phoneNumber': '(0546) 58 08 00'
  },
  {
    'hostName': 'Gemeente Wijchen',
    'address': 'Postbus 9000',
    'postalCode': '6600 HA',
    'cityName': 'WIJCHEN',
    'emailAddress': 'wijchen@straat.info',
    'phoneNumber': '14 024'
  },
  {
    'hostName': 'Gemeente Wijdemeren',
    'address': 'Postbus 190',
    'postalCode': '1230 AD',
    'cityName': 'LOOSDRECHT',
    'emailAddress': 'wijdemeren@straat.info',
    'phoneNumber': '(035) 655 95 95'
  },
  {
    'hostName': 'Gemeente Wijk bij Duurstede',
    'address': 'Postbus 83',
    'postalCode': '3960 BB',
    'cityName': 'WIJK BIJ DUURSTEDE',
    'emailAddress': 'wijk@straat.info',
    'phoneNumber': '(0343) 59 55 95'
  },
  {
    'hostName': 'Gemeente Winsum',
    'address': 'Postbus 10',
    'postalCode': '9950 AA',
    'cityName': 'WINSUM GN',
    'emailAddress': 'winsum@straat.info',
    'phoneNumber': '(0595) 44 77 77'
  },
  {
    'hostName': 'Gemeente Winterswijk',
    'address': 'Postbus 101',
    'postalCode': '7100 AC',
    'cityName': 'WINTERSWIJK',
    'emailAddress': 'winterswijk@straat.info',
    'phoneNumber': '(0543) 54 35 43'
  },
  {
    'hostName': 'Gemeente Woensdrecht',
    'address': 'Postbus 24',
    'postalCode': '4630 AA',
    'cityName': 'HOOGERHEIDE',
    'emailAddress': 'woensdrecht@straat.info',
    'phoneNumber': '14 0164'
  },
  {
    'hostName': 'Gemeente Woerden',
    'address': 'Blekerijlaan 14',
    'postalCode': '3447 GR',
    'cityName': 'WOERDEN',
    'emailAddress': 'woerden@straat.info',
    'phoneNumber': '14 0348'
  },
  {
    'hostName': 'Gemeente Wormerland',
    'address': 'Postbus 20',
    'postalCode': '1530 AA',
    'cityName': 'WORMER',
    'emailAddress': 'wormerland@straat.info',
    'phoneNumber': '(075) 642 90 00'
  },
  {
    'hostName': 'Gemeente Woudenberg',
    'address': 'Postbus 16',
    'postalCode': '3930 EA',
    'cityName': 'WOUDENBERG',
    'emailAddress': 'woudenberg@straat.info',
    'phoneNumber': '(033) 286 91 00'
  },
  {
    'hostName': 'Gemeente Woudrichem',
    'address': 'Postbus 6',
    'postalCode': '4285 ZG',
    'cityName': 'WOUDRICHEM',
    'emailAddress': 'woudrichem@straat.info',
    'phoneNumber': '(0183) 30 81 00'
  },
  {
    'hostName': 'Gemeente Zaanstad',
    'address': 'Postbus 2000',
    'postalCode': '1500 GA',
    'cityName': 'ZAANDAM',
    'emailAddress': 'zaanstad@straat.info',
    'phoneNumber': '14075'
  },
  {
    'hostName': 'Gemeente Zaltbommel',
    'address': 'Postbus 10002',
    'postalCode': '5300 DA',
    'cityName': 'ZALTBOMMEL',
    'emailAddress': 'zaltbommel@straat.info',
    'phoneNumber': '14 0418'
  },
  {
    'hostName': 'Gemeente Zandvoort',
    'address': 'Postbus 2',
    'postalCode': '2040 AA',
    'cityName': 'ZANDVOORT',
    'emailAddress': 'zandvoort@straat.info',
    'phoneNumber': '(023) 574 01 00'
  },
  {
    'hostName': 'Gemeente Zederik',
    'address': 'Postbus 1',
    'postalCode': '4230 BA',
    'cityName': 'MEERKERK',
    'emailAddress': 'zederik@straat.info',
    'phoneNumber': '(0183) 35 65 00'
  },
  {
    'hostName': 'Gemeente Zeewolde',
    'address': 'Postbus 1',
    'postalCode': '3890 AA',
    'cityName': 'ZEEWOLDE',
    'emailAddress': 'zeewolde@straat.info',
    'phoneNumber': '(036) 522 95 22'
  },
  {
    'hostName': 'Gemeente Zeist',
    'address': 'Postbus 513',
    'postalCode': '3700 AM',
    'cityName': 'ZEIST',
    'emailAddress': 'zeist@straat.info',
    'phoneNumber': '14 030'
  },
  {
    'hostName': 'Gemeente Zevenaar',
    'address': 'Postbus 10',
    'postalCode': '6900 AA',
    'cityName': 'ZEVENAAR',
    'emailAddress': 'zevenaar@straat.info',
    'phoneNumber': '(0316) 59 51 11'
  },
  {
    'hostName': 'Gemeente Zoetermeer',
    'address': 'Postbus 15',
    'postalCode': '2700 AA',
    'cityName': 'ZOETERMEER',
    'emailAddress': 'zoetermeer@straat.info',
    'phoneNumber': '14 079'
  },
  {
    'hostName': 'Gemeente Zoeterwoude',
    'address': 'Postbus 34',
    'postalCode': '2380 AA',
    'cityName': 'ZOETERWOUDE',
    'emailAddress': 'zoeterwoude@straat.info',
    'phoneNumber': '(071) 580 63 00'
  },
  {
    'hostName': 'Gemeente Zuidhorn',
    'address': 'Postbus 3',
    'postalCode': '9800 AA',
    'cityName': 'ZUIDHORN',
    'emailAddress': 'zuidhorn@straat.info',
    'phoneNumber': '(0594) 50 88 88'
  },
  {
    'hostName': 'Gemeente Zuidplas',
    'address': 'Postbus 100',
    'postalCode': '2910 AC',
    'cityName': 'NIEUWERKERK AD IJSSEL',
    'emailAddress': 'zuidplas@straat.info',
    'phoneNumber': '(0180) 33 03 00'
  },
  {
    'hostName': 'Gemeente Zundert',
    'address': 'Postbus 10001',
    'postalCode': '4880 GA',
    'cityName': 'ZUNDERT',
    'emailAddress': 'zundert@straat.info',
    'phoneNumber': '(076) 599 56 00'
  },
  {
    'hostName': 'Gemeente Zutphen',
    'address': 'Postbus 41',
    'postalCode': '7200 AA',
    'cityName': 'ZUTPHEN',
    'emailAddress': 'zutphen@straat.info',
    'phoneNumber': '14 0575'
  },
  {
    'hostName': 'Gemeente Zwartewaterland',
    'address': 'Postbus 23',
    'postalCode': '8060 AA',
    'cityName': 'HASSELT',
    'emailAddress': 'zwartewaterland@straat.info',
    'phoneNumber': '(038) 385 30 00'
  },
  {
    'hostName': 'Gemeente Zwijndrecht',
    'address': 'Postbus 15',
    'postalCode': '3330 AA',
    'cityName': 'ZWIJNDRECHT',
    'emailAddress': 'zwijndrecht@straat.info',
    'phoneNumber': '14078'
  },
  {
    'hostName': 'Gemeente Zwolle',
    'address': 'Postbus 10007',
    'postalCode': '8000 GA',
    'cityName': 'ZWOLLE',
    'emailAddress': 'zwolle@straat.info',
    'phoneNumber': '14038'
  }]

  const HostListTest = [
    {
      hostName: 'Gemeente Zwartewaterland',
      address: 'Postbus 23',
      postalCode: '8060 AA',
      cityName: 'HASSELT',
      emailAddress: 'zwartewaterland@straat.info',
      phoneNumber: '(038) 385 30 00'
    },
    {
      hostName: 'Gemeente Zwijndrecht',
      address: 'Postbus 15',
      postalCode: '3330 AA',
      cityName: 'ZWIJNDRECHT',
      emailAddress: 'zwijndrecht@straat.info',
      phoneNumber: '14078'
    },
    {
      hostName: 'Gemeente Zwolle',
      address: 'Postbus 10007',
      postalCode: '8000 GA',
      cityName: 'ZWOLLE',
      emailAddress: 'zwolle@straat.info',
      phoneNumber: '14038'
    }]

const failedHostList = [
{
  "hostName": "Gemeente Alphen-Chaam",
  "address": "Postbus 3",
  "postalCode": "5130 AA",
  "cityName": "ALPHEN NB",
  "emailAddress": "alphenchaam@straat.info",
  "phoneNumber": "(013) 508 66 66"
}, {
  "hostName": "Gemeente Beek",
  "address": "Postbus 20",
  "postalCode": "6190 AA",
  "cityName": "BEEK LB",
  "emailAddress": "beek@straat.info",
  "phoneNumber": "(046) 438 92 22"
}, {
  "hostName": "Gemeente Bergen (L)",
  "address": "Postbus 140",
  "postalCode": "5854 ZJ",
  "cityName": "BERGEN LB",
  "emailAddress": "bergenLIMBURG@straat.info",
  "phoneNumber": "(0485) 34 83 83"
}, {
  "hostName": "Gemeente Culemborg",
  "address": "Postbus 136",
  "postalCode": "4100 AC",
  "cityName": "CULEMBORG",
  "emailAddress": "culemborg@straat.info",
  "phoneNumber": "(0345) 47 77 00"
}, {
  "hostName": "Gemeente Doetinchem",
  "address": "Postbus 9020",
  "postalCode": "7000 HA",
  "cityName": "DOETINCHEM",
  "emailAddress": "doetinchem@straat.info",
  "phoneNumber": "(0314) 37 73 77"
}, {
  "hostName": "Gemeente Druten",
  "address": "Postbus 1",
  "postalCode": "6650 AA",
  "cityName": "DRUTEN",
  "emailAddress": "druten@straat.info",
  "phoneNumber": "14 0487"
}, {
  "hostName": "Gemeente Ede",
  "address": "Postbus 9022",
  "postalCode": "6710 HK",
  "cityName": "EDE GLD",
  "emailAddress": "ede@straat.info",
  "phoneNumber": "14-0318"
}, {
  "hostName": "Gemeente Eemsmond",
  "address": "Postbus 11",
  "postalCode": "9980 AA",
  "cityName": "UITHUIZEN",
  "emailAddress": "eemsmond@straat.info",
  "phoneNumber": "(0595) 43 75 55"
}, {
  "hostName": "Gemeente Hengelo Ov.",
  "address": "Postbus 18",
  "postalCode": "7550 AA",
  "cityName": "HENGELO OV",
  "emailAddress": "hengelo@straat.info",
  "phoneNumber": "(074) 245 98 76"
}, {
  "hostName": "Gemeente Hoorn",
  "address": "Postbus 603",
  "postalCode": "1620 AR",
  "cityName": "HOORN NH",
  "emailAddress": "hoorn@straat.info",
  "phoneNumber": "(0229) 25 22 00"
}, {
  "hostName": "Gemeente IJsselstein",
  "address": "Postbus 26",
  "postalCode": "3400 AA",
  "cityName": "IJSSELSTEIN UT",
  "emailAddress": "ijsselstein@straat.info",
  "phoneNumber": "14 030"
}, {
  "hostName": "Gemeente Katwijk",
  "address": "Postbus 589",
  "postalCode": "2220 AN",
  "cityName": "KATWIJK ZH",
  "emailAddress": "katwijk@straat.info",
  "phoneNumber": "(071) 406 50 00"
}, {
  "hostName": "Gemeente Nijkerk",
  "address": "Postbus 1000",
  "postalCode": "3860 BA",
  "cityName": "NIJKERK GLD",
  "emailAddress": "nijkerk@straat.info",
  "phoneNumber": "14 033"
}, {
  "hostName": "Gemeente Noordwijk",
  "address": "Postbus 298",
  "postalCode": "2200 AG",
  "cityName": "NOORDWIJK ZH",
  "emailAddress": "noordwijk@straat.info",
  "phoneNumber": "(071) 366 00 00"
}, {
  "hostName": "Gemeente Oosterhout",
  "address": "Postbus 10150",
  "postalCode": "4900 GB",
  "cityName": "OOSTERHOUT NB",
  "emailAddress": "oosterhout@straat.info",
  "phoneNumber": "14 0162"
}, {
  "hostName": "Gemeente Ooststellingwerf",
  "address": "Postbus 38",
  "postalCode": "8430 AA",
  "cityName": "OOSTERWOLDE FR",
  "emailAddress": "ooststellingwerf@straat.info",
  "phoneNumber": "(0516) 56 62 22"
}, {
  "hostName": "Gemeente Overbetuwe",
  "address": "Postbus 11",
  "postalCode": "6660 AA",
  "cityName": "ELST GLD",
  "emailAddress": "overbetuwe@straat.info",
  "phoneNumber": "(0481) 36 23 00"
}, {
  "hostName": "Gemeente Rijswijk",
  "address": "Postbus 5305",
  "postalCode": "2280 HH",
  "cityName": "RIJSWIJK ZH",
  "emailAddress": "rijswijk@straat.info",
  "phoneNumber": "14070"
}, {
  "hostName": "Gemeente Rozendaal",
  "address": "Postbus 9106",
  "postalCode": "6880 HH",
  "cityName": "VELP GLD",
  "emailAddress": "rozendaal@straat.info",
  "phoneNumber": "(026) 384 36 66"
}, {
  "hostName": "Gemeente Scherpenzeel",
  "address": "Postbus 100",
  "postalCode": "3925 ZJ",
  "cityName": "SCHERPENZEEL GLD",
  "emailAddress": "scherpenzeel@straat.info",
  "phoneNumber": "(033) 277 23 24"
}, {
  "hostName": "Gemeente Steenbergen",
  "address": "Postbus 6",
  "postalCode": "4650 AA",
  "cityName": "STEENBERGEN NB",
  "emailAddress": "steenbergen@straat.info",
  "phoneNumber": "140167"
}, {
  "hostName": "Gemeente Stein",
  "address": "Postbus 15",
  "postalCode": "6170 AA",
  "cityName": "STEIN LB",
  "emailAddress": "stein@straat.info",
  "phoneNumber": "(046) 435 93 93"
}, {
  "hostName": "Gemeente Valkenburg aan de Geul",
  "address": "Postbus 998",
  "postalCode": "6300 AZ",
  "cityName": "VALKENBURG LB",
  "emailAddress": "valkenburg@straat.info",
  "phoneNumber": "14 043"
}, {
  "hostName": "Gemeente Vianen",
  "address": "Postbus 46",
  "postalCode": "4130 EA",
  "cityName": "VIANEN UT",
  "emailAddress": "vianen@straat.info",
  "phoneNumber": "(0347) 36 99 11"
}, {
  "hostName": "Gemeente Zuidplas",
  "address": "Postbus 100",
  "postalCode": "2910 AC",
  "cityName": "NIEUWERKERK AD IJSSEL",
  "emailAddress": "zuidplas@straat.info",
  "phoneNumber": "(0180) 33 03 00"
}]

const getNoErroHostList = () => {
  return hostList.filter((host, index) => {
    if(failedHostList.find((x, i) => x.cityName === host.cityName)) {
      return false
    }
    else {
      return true
    }
  })
}

const fullHostList = {

}

module.exports = {
  hostList: getNoErroHostList(),
  HostListTest,
  failedHostList,
  fullHostList: hostList
}
  