const {
    SlashCommandBuilder,
    ContextMenuCommandAssertions,
} = require("discord.js");

const playerArrays = require('../readInPlayers.js')
randomizerGKArray = playerArrays.randomizerGKArray;
randomizerPlayerArray = playerArrays.randomizerPlayerArray;
randomizerNonSpecialElite = playerArrays.randomizerNonSpecialElite;
randomizerGKNonSpecialElite = playerArrays.randomizerGKNonSpecialElite;
randomizerGKPromoElites = playerArrays.randomizerGKPromoElites;
randomizerPromoElites = playerArrays.randomizerPromoElites;
randomizerSilverElites = playerArrays.randomizerSilverElites;
randomizerGKSilverElites = playerArrays.randomizerGKSilverElites;

randomizerGKPOTW = playerArrays.randomizerGKPOTW;
randomizerPOTW = playerArrays.randomizerPOTW;


var flags = {
    "Afghanistan":":flag_af:",
    "Åland Islands":":flag_ax:",
    "Albania":":flag_al:",
    "Algeria":":flag_dz:",
    "American Samoa":":flag_as:",
    "Andorra":":flag_ad:",
    "Angola":":flag_ao:",
    "Anguilla":":flag_ai:",
    "Antarctica [a]":":flag_aq:",
    "Antigua and Barbuda":":flag_ag:",
    "Argentina":":flag_ar:",
    "Armenia":":flag_am:",
    "Aruba":":flag_aw:",
    "Australia":":flag_au:",
    "Austria":":flag_at:",
    "Azerbaijan":":flag_az:",
    "Bahamas (the)":":flag_bs:",
    "Bahrain":":flag_bh:",
    "Bangladesh":":flag_bd:",
    "Barbados":":flag_bb:",
    "Belarus":":flag_by:",
    "Belgium":":flag_be:",
    "Belize":":flag_bz:",
    "Benin":":flag_bj:",
    "Bermuda":":flag_bm:",
    "Bhutan":":flag_bt:",
    "Bolivia (Plurinational State of)":":flag_bo:",
    "Bonaire Sint Eustatius\n Saba":":flag_bq:",
    "Bosnia & Herzegovina":":flag_ba:",
    "Botswana":":flag_bw:",
    "Bouvet Island":":flag_bv:",
    "Brazil":":flag_br:",
    "British Indian Ocean Territory (the)":":flag_io:",
    "Brunei Darussalam [e]":":flag_bn:",
    "Bulgaria":":flag_bg:",
    "Burkina Faso":":flag_bf:",
    "Burundi":":flag_bi:",
    "Cape Verde":":flag_cv:",
    "Cambodia":":flag_kh:",
    "Cameroon":":flag_cm:",
    "Canada":":flag_ca:",
    "Cayman Islands (the)":":flag_ky:",
    "Central African Republic":":flag_cf:",
    "Chad":":flag_td:",
    "Chile":":flag_cl:",
    "China":":flag_cn:",
    "Christmas Island":":flag_cx:",
    "Cocos (Keeling) Islands (the)":":flag_cc:",
    "Colombia":":flag_co:",
    "Comoros (the)":":flag_km:",
    "DR Congo":":flag_cd:",
    "Congo":":flag_cg:",
    "Cook Islands (the)":":flag_ck:",
    "Costa Rica":":flag_cr:",
    "Ivory Coast":":flag_ci:",
    "Croatia":":flag_hr:",
    "Cuba":":flag_cu:",
    "Curacao":":flag_cw:",
    "Cyprus":":flag_cy:",
    "Czechia":":flag_cz:",
    "Denmark":":flag_dk:",
    "Djibouti":":flag_dj:",
    "Dominica":":flag_dm:",
    "Dominican Republic":":flag_do:",
    "Ecuador":":flag_ec:",
    "Egypt":":flag_eg:",
    "El Salvador":":flag_sv:",
    "Equatorial Guinea":":flag_gq:",
    "Eritrea":":flag_er:",
    "Estonia":":flag_ee:",
    "Eswatini [j]":":flag_sz:",
    "Ethiopia":":flag_et:",
    "Falkland Islands (the) [Malvinas] [k]":":flag_fk:",
    "Faroe Islands (the)":":flag_fo:",
    "Fiji":":flag_fj:",
    "Finland":":flag_fi:",
    "France":":flag_fr:",
    "French Guiana":":flag_gf:",
    "French Polynesia":":flag_pf:",
    "French Southern Territories (the) [m]":":flag_tf:",
    "Gabon":":flag_ga:",
    "Gambia":":flag_gm:",
    "Georgia":":flag_ge:",
    "Germany":":flag_de:",
    "Ghana":":flag_gh:",
    "Gibraltar":":flag_gi:",
    "Greece":":flag_gr:",
    "Greenland":":flag_gl:",
    "Grenada":":flag_gd:",
    "Guadeloupe":":flag_gp:",
    "Guam":":flag_gu:",
    "Guatemala":":flag_gt:",
    "Guernsey":":flag_gg:",
    "Guinea":":flag_gn:",
    "Guinea Bissau":":flag_gw:",
    "Guyana":":flag_gy:",
    "Haiti":":flag_ht:",
    "Heard Island and McDonald Islands":":flag_hm:",
    "Holy See (the) [n]":":flag_va:",
    "Honduras":":flag_hn:",
    "Hong Kong":":flag_hk:",
    "Hungary":":flag_hu:",
    "Iceland":":flag_is:",
    "India":":flag_in:",
    "Indonesia":":flag_id:",
    "Iran (Islamic Republic of)":":flag_ir:",
    "Iraq":":flag_iq:",
    "Ireland":":flag_ie:",
    "Isle of Man":":flag_im:",
    "Italy":":flag_it:",
    "Jamaica":":flag_jm:",
    "Japan":":flag_jp:",
    "Jersey":":flag_je:",
    "Jordan":":flag_jo:",
    "Kazakhstan":":flag_kz:",
    "Kenya":":flag_ke:",
    "Kiribati":":flag_ki:",
    "Korea (the Democratic People's Republic of) [o]":":flag_kp:",
    "South Korea":":flag_kr:",
    "Kuwait":":flag_kw:",
    "Kyrgyzstan":":flag_kg:",
    "Lao People's Democratic Republic (the) [q]":":flag_la:",
    "Latvia":":flag_lv:",
    "Lebanon":":flag_lb:",
    "Lesotho":":flag_ls:",
    "Liberia":":flag_lr:",
    "Libya":":flag_ly:",
    "Liechtenstein":":flag_li:",
    "Lithuania":":flag_lt:",
    "Luxembourg":":flag_lu:",
    "Macao [r]":":flag_mo:",
    "North Macedonia":":flag_mk:",
    "Madagascar":":flag_mg:",
    "Malawi":":flag_mw:",
    "Malaysia":":flag_my:",
    "Maldives":":flag_mv:",
    "Mali":":flag_ml:",
    "Malta":":flag_mt:",
    "Marshall Islands (the)":":flag_mh:",
    "Martinique":":flag_mq:",
    "Mauritania":":flag_mr:",
    "Mauritius":":flag_mu:",
    "Mayotte":":flag_yt:",
    "Mexico":":flag_mx:",
    "Micronesia (Federated States of)":":flag_fm:",
    "Moldova (the Republic of)":":flag_md:",
    "Monaco":":flag_mc:",
    "Mongolia":":flag_mn:",
    "Montenegro":":flag_me:",
    "Montserrat":":flag_ms:",
    "Morocco":":flag_ma:",
    "Mozambique":":flag_mz:",
    "Myanmar [t]":":flag_mm:",
    "Namibia":":flag_na:",
    "Nauru":":flag_nr:",
    "Nepal":":flag_np:",
    "Netherlands":":flag_nl:",
    "New Caledonia":":flag_nc:",
    "New Zealand":":flag_nz:",
    "Nicaragua":":flag_ni:",
    "Niger (the)":":flag_ne:",
    "Nigeria":":flag_ng:",
    "Niue":":flag_nu:",
    "Norfolk Island":":flag_nf:",
    "Northern Mariana Islands (the)":":flag_mp:",
    "Norway":":flag_no:",
    "Oman":":flag_om:",
    "Pakistan":":flag_pk:",
    "Palau":":flag_pw:",
    "Palestine":":flag_ps:",
    "Panama":":flag_pa:",
    "Papua New Guinea":":flag_pg:",
    "Paraguay":":flag_py:",
    "Peru":":flag_pe:",
    "Philippines":":flag_ph:",
    "Pitcairn [u]":":flag_pn:",
    "Poland":":flag_pl:",
    "Portugal":":flag_pt:",
    "Puerto Rico":":flag_pr:",
    "Qatar":":flag_qa:",
    "Réunion":":flag_re:",
    "Romania":":flag_ro:",
    "Russia":":flag_ru:",
    "Rwanda":":flag_rw:",
    "Saint Barthélemy":":flag_bl:",
    "Saint Helena Ascension and Tristan da Cunha":":flag_sh:",
    "Saint Kitts and Nevis":":flag_kn:",
    "Saint Lucia":":flag_lc:",
    "Saint Martin (French part)":":flag_mf:",
    "Saint Pierre and Miquelon":":flag_pm:",
    "Saint Vincent and the Grenadines":":flag_vc:",
    "Samoa":":flag_ws:",
    "San Marino":":flag_sm:",
    "Sao Tome and Principe":":flag_st:",
    "Saudi Arabia":":flag_sa:",
    "Senegal":":flag_sn:",
    "Serbia":":flag_rs:",
    "Seychelles":":flag_sc:",
    "Sierra Leone":":flag_sl:",
    "Singapore":":flag_sg:",
    "Sint Maarten (Dutch part)":":flag_sx:",
    "Slovakia":":flag_sk:",
    "Slovenia":":flag_si:",
    "Solomon Islands":":flag_sb:",
    "Somalia":":flag_so:",
    "South Africa":":flag_za:",
    "South Georgia and the South Sandwich Islands":":flag_gs:",
    "South Sudan":":flag_ss:",
    "Spain":":flag_es:",
    "Sri Lanka":":flag_lk:",
    "Sudan (the)":":flag_sd:",
    "Suriname":":flag_sr:",
    "Svalbard Jan Mayen":":flag_sj:",
    "Sweden":":flag_se:",
    "Switzerland":":flag_ch:",
    "Syrian Arab Republic (the) [x]":":flag_sy:",
    "Taiwan (Province of China) [y]":":flag_tw:",
    "Tajikistan":":flag_tj:",
    "Tanzania":":flag_tz:",
    "Thailand":":flag_th:",
    "Timor-Leste [aa]":":flag_tl:",
    "Togo":":flag_tg:",
    "Tokelau":":flag_tk:",
    "Tonga":":flag_to:",
    "Trinidad and Tobago":":flag_tt:",
    "Tunisia":":flag_tn:",
    "Turkey":":flag_tr:",
    "Turkmenistan":":flag_tm:",
    "Turks and Caicos Islands (the)":":flag_tc:",
    "Tuvalu":":flag_tv:",
    "Uganda":":flag_ug:",
    "Ukraine":":flag_ua:",
    "United Arab Emirates (the)":":flag_ae:",
    "Northern Ireland":":flag_gb:",
    "United States Minor Outlying Islands (the) [ac]":":flag_um:",
    "USA":":flag_us:",
    "Uruguay":":flag_uy:",
    "Uzbekistan":":flag_uz:",
    "Vanuatu":":flag_vu:",
    "Venezuela":":flag_ve:",
    "Viet Nam [ae]":":flag_vn:",
    "Virgin Islands (British) [af]":":flag_vg:",
    "Virgin Islands (U.S.) [ag]":":flag_vi:",
    "Wallis and Futuna":":flag_wf:",
    "Western Sahara [ah]":":flag_eh:",
    "Yemen":":flag_ye:",
    "Zambia":":flag_zm:",
    "Zimbabwe":":flag_zw:",
    "England":":england:",
    "Scotland":":scotland:",
    "Kosovo":":flag_xk:",
    "Reunion":":flag_re:",
    "Wales":":wales:",
    "Lichtenstein":":flag_lichtenstein:",
};


function generatePlayer(rating) {

    position = generateRandomNumber(1, 11);

    switch (rating) {
        case 91:
            rng = generateRandomNumber(1, 3);
            return randomizerPlayerArray[18 + rng - 1];
            break;
        case 90:
            if (position == 1) {
                return randomizerGKArray[2];
            } else {
                rng = generateRandomNumber(1, 4);
                return randomizerPlayerArray[32 + rng - 1];
            }
            break;
        case 89:
            if (position == 1) {
                rng = generateRandomNumber(1, 2);
                return randomizerGKArray[4 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 7);
                return randomizerPlayerArray[63 + rng - 1];
            }
            break;
        case 88:
            if (position == 1) {
                rng = generateRandomNumber(1,2);
                return randomizerGKArray[8 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 6);
                return randomizerPlayerArray[104 + rng - 1];
            }
            break;
        case 87:
            if (position == 1) {
                rng = generateRandomNumber(1, 4);
                return randomizerGKArray[11 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 6);
                return randomizerPlayerArray[137 + rng - 1];
            }
            break;
        case 86:
            if (position == 1) {
                return randomizerGKArray[16];
            } else {
                rng = generateRandomNumber(1, 25);
                return randomizerPlayerArray[170 + rng - 1];
            }
            break;
        case 85:
            if (position == 1) {
                rng = generateRandomNumber(1, 5);
                return randomizerGKArray[17 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 25);
                return randomizerPlayerArray[201 + rng - 1];
            }
            break;

        case 84:
            if (position == 1) {
                rng = generateRandomNumber(1, 6);
                return randomizerGKArray[22 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 45);
                return randomizerPlayerArray[226 + rng - 1];
            }
            break;
        case 83:
            if (position == 1) {
                rng = generateRandomNumber(1, 3);
                return randomizerGKArray[28 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 53);
                if(rng <=52){
                    return randomizerPlayerArray[271 + rng - 1];
                }
                else{
                    return randomizerPlayerArray[16134];
                }
            }
            break;
        case 82:
            if (position == 1) {
                rng = generateRandomNumber(1, 9);
                return randomizerGKArray[31 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 64);
                return randomizerPlayerArray[323 + rng - 1];
            }
            break;
        case 81:
            if (position == 1) {
                rng = generateRandomNumber(1, 10);
                return randomizerGKArray[40 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 77);
                return randomizerPlayerArray[387 + rng - 1];
            }
            break;
        case 80:
            if (position == 1) {
                rng = generateRandomNumber(1, 14);
                return randomizerGKArray[50 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 99);
                return randomizerPlayerArray[464 + rng - 1];
            }
            break;
        case 79:
            if (position == 1) {
                rng = generateRandomNumber(1, 21);
                return randomizerGKArray[64 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 133);
                return randomizerPlayerArray[563 + rng - 1];
            }
            break;
        case 78:
            if (position == 1) {
                rng = generateRandomNumber(1, 19);
                return randomizerGKArray[85 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 164);
                return randomizerPlayerArray[696 + rng - 1];
            }
            break;
        case 77:
            if (position == 1) {
                rng = generateRandomNumber(1, 16);
                return randomizerGKArray[104 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 212);
                return randomizerPlayerArray[860 + rng - 1];
            }
            break;
        case 76:
            if (position == 1) {
                rng = generateRandomNumber(1, 27);
                return randomizerGKArray[120 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 270);
                return randomizerPlayerArray[1072 + rng - 1];
            }
            break;
        case 75:
            if (position == 1) {
                rng = generateRandomNumber(1, 32);
                return randomizerGKArray[147 + rng - 1];
            } 
            else {
                rng = generateRandomNumber(1, 269);
                if(rng <= 267){
                    return randomizerPlayerArray[1342 + rng - 1];
                }
                else {
                    if(rng==268)
                    {
                        return randomizerPlayerArray[16132];
                    }
                    else if(rng == 269)
                    {
                        return randomizerPlayerArray[16133];
                    }
                }
            }
            break;
        case 74:
            if (position == 1) {
                rng = generateRandomNumber(1, 42);
                return randomizerGKArray[189 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 434);
                return randomizerPlayerArray[1609 + rng - 1];
            }
            break;
        case 73:
            if (position == 1) {
                rng = generateRandomNumber(1, 55);
                return randomizerGKArray[231 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 482);
                return randomizerPlayerArray[2043 + rng - 1];
            }
            break;
        case 72:
            if (position == 1) {
                rng = generateRandomNumber(1, 67);
                return randomizerGKArray[286 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 586);
                return randomizerPlayerArray[2525 + rng - 1];
            }
            break;
        case 71:
            if (position == 1) {
                rng = generateRandomNumber(1, 71);
                return randomizerGKArray[353 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 667);
                return randomizerPlayerArray[3111 + rng - 1];
            }
            break;
        case 70:
            if (position == 1) {
                rng = generateRandomNumber(1, 73);
                return randomizerGKArray[424 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 783);
                return randomizerPlayerArray[3778 + rng - 1];
            }
            break;
        case 69:
            if (position == 1) {
                rng = generateRandomNumber(1, 71);
                return randomizerGKArray[497 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 902);
                return randomizerPlayerArray[4561 + rng - 1];
            }
            break;
        case 68:
            if (position == 1) {
                rng = generateRandomNumber(1, 93);
                return randomizerGKArray[568 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 929);
                return randomizerPlayerArray[5463 + rng - 1];
            }
            break;
        case 67:
            if (position == 1) {
                rng = generateRandomNumber(1, 90);
                return randomizerGKArray[661 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 1015);
                return randomizerPlayerArray[6392 + rng - 1];
            }
            break;
        case 66:
            if (position == 1) {
                rng = generateRandomNumber(1, 108);
                return randomizerGKArray[751 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 1018);
                return randomizerPlayerArray[7407 + rng - 1];
            }
            break;
        case 65:
            if (position == 1) {
                rng = generateRandomNumber(1, 109);
                return randomizerGKArray[859 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 1035);
                return randomizerPlayerArray[8425 + rng - 1];
                break;
            }
            break;
        case 64:
            if (position == 1) {
                rng = generateRandomNumber(1, 120);
                return randomizerGKArray[968 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 1059);
                return randomizerPlayerArray[9460 + rng - 1];
            }
            break;
        case 63:
            if (position == 1) {
                rng = generateRandomNumber(1, 101);
                return randomizerGKArray[1088 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 963);
                return randomizerPlayerArray[10519 + rng - 1];
            }
            break;
        case 62:
            if (position == 1) {
                rng = generateRandomNumber(1, 95);
                return randomizerGKArray[1189 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 840);
                return randomizerPlayerArray[11482 + rng - 1];
            }
            break;
        case 61:
            if (position == 1) {
                rng = generateRandomNumber(1, 93);
                return randomizerGKArray[1284 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 648);
                return randomizerPlayerArray[12322 + rng - 1];
            }
            break;
        case 60:
            if (position == 1) {
                rng = generateRandomNumber(1, 106);
                return randomizerGKArray[1377 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 625);
                return randomizerPlayerArray[12970 + rng - 1];
            }
            break;
        case 59:
            if (position == 1) {
                rng = generateRandomNumber(1, 82);
                return randomizerGKArray[1483 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 437);
                return randomizerPlayerArray[13595 + rng - 1];
            }
            break;
        case 58:
            if (position == 1) {
                rng = generateRandomNumber(1, 85);
                return randomizerGKArray[1565 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 409);
                return randomizerPlayerArray[14032 + rng - 1];
            }
            break;
        case 57:
            if (position == 1) {
                rng = generateRandomNumber(1, 64);
                return randomizerGKArray[1650 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 322);
                return randomizerPlayerArray[14441 + rng - 1];
            }
            break;
        case 56:
            if (position == 1) {
                rng = generateRandomNumber(1, 60);
                return randomizerGKArray[1714 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 303);
                return randomizerPlayerArray[14763 + rng - 1];
            }
            break;
        case 55:
            if (position == 1) {
                rng = generateRandomNumber(1, 65);
                return randomizerGKArray[1774 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 250);
                return randomizerPlayerArray[15066 + rng - 1];
            }
            break;
        case 54:
            if (position == 1) {
                rng = generateRandomNumber(1, 49);
                return randomizerGKArray[1839 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 231);
                return randomizerPlayerArray[15316 + rng - 1];
            }
            break;
        case 53:
            if (position == 1) {
                rng = generateRandomNumber(1, 51);
                return randomizerGKArray[1888 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 585);
                return randomizerPlayerArray[15547 + rng - 1];
            }
            break;
    }
}

function generateEliteGold(gk) {
    if (gk == 1) {
        rng = generateRandomNumber(1, 15);
        count = 0;
        for (let i = 0; i < 22; i++) {
            if (!randomizerGKArray[i][1].includes("Icon") && !randomizerGKArray[i][1].includes("Hero")) {
                if (count + 1 == rng) {
                    return randomizerGKArray[i];
                } else {
                    count++;
                }
            }
        }
    } else {
        rng = generateRandomNumber(1, 76);
        count = 0;
        for (let i = 0; i < 226; i++) {
            if (!randomizerPlayerArray[i][1].includes("Icon") && !randomizerPlayerArray[i][1].includes("Hero")) {
                if (count + 1 == rng) {
                    return randomizerPlayerArray[i];
                } else {
                    count++;
                }
            }
        }
    }

}

function generateNonSpecialElite() {
    if (randomizerGKNonSpecialElite.length == 0) {
        //No GKs, only rng players
        rng = generateRandomNumber(1, randomizerNonSpecialElite.length);
        return randomizerNonSpecialElite[rng - 1];
    } else {
        position = generateRandomNumber(1, 11);
        if (position == 1) {
            //generate GK
            rng = generateRandomNumber(1, randomizerGKNonSpecialElite.length);
            return randomizerGKNonSpecialElite[rng - 1];
        } else {
            //generateOutfielder
            rng = generateRandomNumber(1, randomizerNonSpecialElite.length);
            return randomizerNonSpecialElite[rng - 1];
        }
    }
}

function generatePromoPlayer() {
    if (randomizerGKPromoElites.length == 0) {
        //No GKs, only rng players
        rng = generateRandomNumber(1, randomizerPromoElites.length);
        return randomizerPromoElites[rng - 1];
    } else {
        position = generateRandomNumber(1, 11);
        if (position == 1) {
            //generate GK
            rng = generateRandomNumber(1, randomizerGKPromoElites.length);
            return randomizerGKPromoElites[rng-1];
        } else {
            rng = generateRandomNumber(1, randomizerPromoElites.length);
            return randomizerPromoElites[rng - 1];
        }
    }
}

function generatePOTWPlayer() {
    if (randomizerGKPOTW.length == 0) {
        //No GKs, only rng players
        rng = generateRandomNumber(1, randomizerPOTW.length);
        return randomizerPOTW[rng - 1];
    } else {
        position = generateRandomNumber(1, 11);
        if (position == 1) {
            //generate GK
            rng = generateRandomNumber(1, randomizerGKPOTW.length);
            return randomizerGKPOTW[rng-1];
        } else {
            rng = generateRandomNumber(1, randomizerPOTW.length);
            return randomizerPOTW[rng - 1];
        }
    }
}

function generateHero(gk) {
    if (gk == 1) {
        rng = generateRandomNumber(1, 2);
        count = 0;
        for (let i = 0; i < 22; i++) {
            if (randomizerGKArray[i][1].includes("Hero")) {
                if (count + 1 == rng) {
                    return randomizerGKArray[i];
                } else {
                    count++;
                }
            }
        }
    } else {
        rng = generateRandomNumber(1, 55);
        count = 0;
        for (let i = 0; i < 226; i++) {
            if (randomizerPlayerArray[i][1].includes("Hero")) {
                if (count + 1 == rng) {
                    return randomizerPlayerArray[i];
                } else {
                    count++;
                }
            }
        }
    }
}

function generateSilverSpecial() {
    if (randomizerGKSilverElites.length == 0) {
        //No GKs, only rng players
        rng = generateRandomNumber(1, randomizerSilverElites.length);
        return randomizerSilverElites[rng - 1];
    } else {
        position = generateRandomNumber(1, 11);
        if (position == 1) {
            //generate GK
            rng = generateRandomNumber(1, randomizerGKSilverElites.length);
            return randomizerGKSilverElites[rng];
        } else {
            rng = generateRandomNumber(1, randomizerSilverElites.length);
            return randomizerSilverElites[rng - 1];
        }
    }
}

function generateIcon(gk) {
    if (gk == 1) {
        rng = generateRandomNumber(1, 5);
        count = 0;
        for (let i = 0; i < 22; i++) {
            if (randomizerGKArray[i][1].includes("Icon")) {
                if (count + 1 == rng) {
                    return randomizerGKArray[i];
                } else {
                    count++;
                }
            }
        }
    } else {
        rng = generateRandomNumber(1, 95);
        count = 0;
        for (let i = 0; i < 226; i++) {
            if (randomizerPlayerArray[i][1].includes("Icon")) {
                if (count + 1 == rng) {
                    return randomizerPlayerArray[i];
                } else {
                    count++;
                }
            }
        }
    }
}


function generateElite(promoInPacks) {

    rng = generateRandomNumber(1, 100);
    positionRNG = generateRandomNumber(1, 11);
    if (promoInPacks) {
        if (rng > 0 && rng <= 30) {
            return generatePlayer(85);
        }
        else if (rng > 30 && rng < 49) {
            return generatePlayer(86);
        }
        else if (rng >= 49 && rng < 58) {
            return generatePlayer(87);
        }
        else if (rng >= 58 && rng < 63) {
            return generatePlayer(88);
        }
        else if (rng >= 63 && rng < 66) {
            return generatePlayer(89);
        }
        else if (rng >= 66 && rng < 69) {
            return generatePlayer(90);
        }
        else if (rng >= 69 && rng < 71) {
            return generatePlayer(89);
        }
        else if (rng >= 71 && rng < 82) {
            return generatePromoPlayer();
        } 
        else if (rng >= 82 && rng < 91) {
            //POTW - TO BE ADDED
            return generatePOTWPlayer();
        } 
        else if (rng >= 91 && rng < 98) {
            //Hero
            return generateHero(positionRNG);
        } 
        else if (rng >= 98 && rng <= 100) {
            //Icon
            return generateIcon(positionRNG);
        }
    } else {
        throw ("Promos are always in packs, someone put no for this option somehow")
    }
}

function generateRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored + 1 - minCeiled) + minCeiled);
}

function generateRandomNumbers(amount, min, max) {
    let numbers = [];
    for (let i = 0; i < amount; i++) {
        numbers[i] = generateRandomNumber(min, max);
    }
    return numbers;
}

function stringifyPlayer(player) {
    if (player == null) {
        throw new Error('Some invalid player was generated???');
    }
    playerName = player[4].replace('\n', '');
    if (player[1].includes('Hero')|| player[1].includes('Icon') ) {
        if (player[1].includes('Icon')) {
            toReturn = "__**ICON**__ " + player[2] + " **" + playerName + "** ";
        } else {
            teamName = player[1].substring(player[1].search("\\(") + 1, player[1].search('\\)'));
            toReturn = "__**" + teamName.toUpperCase() + "**__ **Hero** " + player[2] + " **" + playerName + "** ";
        }
    } else if (player[5].includes('POTW') || player[5].includes('Football Heritage')|| player[5].includes('What If')|| player[5].includes('Golden Oldies')|| player[5].includes('Fan Favourites')|| player[5].includes('Ones To Watch')) {
        teamName = player[1];
        playerFlagOne = flags[player[6]];
        toReturn = "**" + player[5] + "** " + player[2] + " **" + playerName + "** " + teamName + " | " + player[5] + " " + playerFlagOne;
    } else if (player[5].includes('Nation Mutation')) {
        teamName = player[1];
        playerFlagOne = flags[player[6].split("/")[0]];
        playerFlagTwo = flags[player[6].split("/")[1]];
        toReturn = "";
        if(player[1]=='Nation Mutation Icon'){
            toReturn = "__**ICON**__ ";
        }
        toReturn = toReturn + "**" + player[5] + "** " + player[2] + " **" + playerName + "** " + teamName + " | " + player[5] + " " + playerFlagOne +  " " + playerFlagTwo;
    } else {
        teamName = player[1].substring(0, player[1].search('[0-9][0-9][0-9][0-9]'));

        toReturn = player[2] + " **" + playerName + "** " + teamName;
        if (player[5] != "") {
            toReturn += " | " + player[5];
        }
    }

    return toReturn;
}

function packOpenString(rating, count, promoInPacks) {

    players = [];

    for (let j = 0; j < count; j++) {
        if (rating > 52 && rating <= 91) {
            players.push(generatePlayer(rating));
            if (count == 1) {
                generatedString = "You opened a 1x " + rating + " pack and got these players: \n";
            } else {
                generatedString = "You opened " + count + " of the " + rating + " player pack and got these players: \n";
            }
        } else if (rating == 0) {
            players.push(generateNonSpecialElite());
            if (count == 1) {
                generatedString = "You opened a 1x Non-Elite Special pack and got these players: \n";
            } else {
                generatedString = "You opened " + count + " of the Non-Elite Special player pack and got these players: \n";
            }
        } else if (rating == 1) {
            players.push(generateElite(promoInPacks));
            if (count == 1) {
                generatedString = "You opened a 1x Elite pack and got these players: \n";
            } else {
                generatedString = "You opened " + count + " of the Elite player pack and got these players: \n";
            }
        }
    }


    size = players.length;


    for (let i = 0; i < size; i++) {
        playerString = stringifyPlayer(players[i]);
        generatedString = generatedString + playerString + "\n";
    }

    return generatedString;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ratingrng")
        .setDescription(
            "Open any of the packs for dupe replacement",
        )
        .addIntegerOption((option) =>
            option
            .setName("rating")
            .setRequired(true)
            .setDescription("The rating you want to rng, put 0 for non-elite special, 1 for random elite"),
        )
        .addIntegerOption((option) =>
            option
            .setName("count")
            .setRequired(false)
            .setDescription("The number of players you want to from each pack"),
        ),
    async execute(interaction) {
        rating = interaction.options.getInteger("rating");
        count = interaction.options.getInteger("count");
        promoInPacks = true;

        if (count == null) {
            count = 1;
        }

        try {
            rngedString = packOpenString(rating, count, promoInPacks);
        } catch (error) {
            console.error(error);
        }

        return interaction.reply(`${rngedString}`);
    },
};