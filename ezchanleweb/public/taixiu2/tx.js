var tien = 0;
socket['on']('chat', function (_0x90f8x2) {
    _0x90f8x2 = JSON['parse'](decode(_0x90f8x2));
    $('#phongchat')['html'](_0x90f8x2['center'] + $('#phongchat')['html']());
    thongbao(_0x90f8x2['notice'], 'thongtin')
});

function so_khac_tx(_0x90f8x4) {
    if (_0x90f8x4 == 1) {
        $('#khung-tx .group-button div')['html']('<div class="button" onclick="btn_money_tx($(this));"><div class="middle" data-txt="100"></div></div><div class="button" onclick="btn_money_tx($(this));"><div class="middle" data-txt="500"></div> </div><div class="button"onclick="btn_money_tx($(this));"><div class="middle" data-txt="1K"></div> </div><div class="button"onclick="btn_money_tx($(this));"><div class="middle" data-txt="5K" ></div> </div><div class="button"onclick="btn_money_tx($(this));"><div class="middle" data-txt="10K"></div> </div><div class="button"onclick="btn_money_tx($(this));"><div class="middle" data-txt="50K"></div> </div><div class="button"onclick="btn_money_tx($(this));"><div class="middle" data-txt="100K"></div> </div><div class="button"onclick="btn_money_tx($(this));" ><div class="middle" data-txt="500K"></div> </div><div class="button"onclick="btn_money_tx($(this));"><div class="middle" data-txt="1M"></div> </div><div class="button" onclick="btn_money_tx($(this));"><div class="middle" data-txt="2M" ></div> </div><div class="button" onclick="btn_money_tx($(this));"><div class="middle" data-txt="5M"></div> </div><div class="button"><div class="middle" data-txt="T\u1EA5t Tay" onclick="tattay_tx()"></div> </div><div class="button blue" onclick="so_khac_tx(2);"><div class="middle" data-txt="S\u1ED1 Kh\xE1c" ></div> </div><div class="button green"  onclick="dat_tx();" ><div class="middle" data-txt="\u0110\u1EB7t C\u01B0\u1EE3c"></div> </div><div class="button red" onclick="cuoc_tx(3)" ><div class="middle" data-txt="H\u1EE7y" ></div></div>')
    } else {
        $('#khung-tx .group-button div')['html']('<div class="button" onclick="btn_khac_tx($(this));"><div class="middle" data-txt="1" ></div></div><div class="button" onclick="btn_khac_tx($(this));"><div class="middle" data-txt="2" ></div> </div><div class="button" onclick="btn_khac_tx($(this));"><div class="middle" data-txt="3" ></div> </div><div class="button" onclick="btn_khac_tx($(this));"><div class="middle" data-txt="4" ></div> </div><div class="button" onclick="btn_khac_tx($(this));"><div class="middle" data-txt="5" ></div> </div><div class="button" onclick="btn_khac_tx($(this));"><div class="middle" data-txt="6" ></div> </div><div class="button" onclick="btn_khac_tx($(this));"><div class="middle" data-txt="7" ></div> </div><div class="button" onclick="btn_khac_tx($(this));"><div class="middle" data-txt="8" ></div> </div><div class="button" onclick="btn_khac_tx($(this));"><div class="middle" data-txt="9" ></div> </div><div class="button" onclick="btn_khac_tx($(this));"><div class="middle" data-txt="0" ></div> </div><div class="button" onclick="btn_khac_tx($(this));"><div class="middle" data-txt="000" ></div> </div><div class="button"  onclick="btn_khac_tx($(this));"><div class="middle" data-txt="X\xF3a" ></div> </div><div class="button blue" ><div class="middle" data-txt="S\u1ED1 Nhanh" onclick="so_khac_tx(1);"></div> </div><div class="button green"  onclick="dat_tx();" ><div class="middle" data-txt="\u0110\u1EB7t C\u01B0\u1EE3c"></div> </div><div class="button red" ><div class="middle" data-txt="H\u1EE7y"  onclick="cuoc_tx(3)"></div></div>')
    }
}
socket['on']('baucua', function (_0x90f8x2) {
    _0x90f8x2 = JSON['parse'](decode(_0x90f8x2));
    if (_0x90f8x2['code'] <= 0) {
        note_play('#khung_baucua .note_here', 'Vui l\xF2ng ch\u1EDD t\u1EDBi phi\xEAn sau.', 'f5f244');
        return false
    };
    $['ajax']({
        type: 'post',
        url: '/user-play',
        data: {
            play_bc: true,
            play_chon1: _0x90f8x2['data']['play_chon1'],
            play_chon2: _0x90f8x2['data']['play_chon2'],
            play_chon3: _0x90f8x2['data']['play_chon3'],
            play_chon4: _0x90f8x2['data']['play_chon4'],
            play_chon5: _0x90f8x2['data']['play_chon5'],
            play_chon6: _0x90f8x2['data']['play_chon6']
        },
        success: function (_0x90f8x5) {
            var _0x90f8x6 = JSON['parse'](_0x90f8x5);
            if (_0x90f8x6['error'] <= 0) {
                note_play('#khung_baucua .note_here', _0x90f8x6['ms'], 'f5f244')
            } else {
                socket['emit']('baucua_cuoc', encode(JSON['stringify']({
                    id: _0x90f8x6['id'],
                    cuoc1: _0x90f8x6['cuoc1'],
                    cuoc2: _0x90f8x6['cuoc2'],
                    cuoc3: _0x90f8x6['cuoc3'],
                    cuoc6: _0x90f8x6['cuoc6'],
                    cuoc4: _0x90f8x6['cuoc4'],
                    cuoc5: _0x90f8x6['cuoc5']
                })));
                note_play('#khung_baucua .note_here', _0x90f8x6['ms'], _0x90f8x6['color']);
                check_all(2)
            }
        }
    })
});
socket['on']('check', function (_0x90f8x2) {
    var _0x90f8x7 = JSON['parse'](decode(_0x90f8x2));
    if (_0x90f8x7['code'] <= 0) {
        note_play('#khung-tx .move-here .note_here', 'Vui long \u0111\u1EE3i \u0111\u1EBFn phi\xEAn sau.', 'f5f244')
    } else {
        $['ajax']({
            type: 'post',
            url: '/user-play',
            data: {
                play_tx: true,
                play_chon: _0x90f8x7['type'],
                key: _0x90f8x7['key'],
                play_dat: _0x90f8x7['xu'],
                phien   : _0x90f8x7['phien'],
            },
            success: function (_0x90f8x5) {
                var _0x90f8x6 = JSON['parse'](_0x90f8x5);
                if (_0x90f8x6['error'] <= 0) {
                    note_play('#khung-tx .move-here .note_here', _0x90f8x6['ms'], 'f5f244')
                } else {
                    note_play('.move-here .note_here', _0x90f8x6['ms'], _0x90f8x6['color']);
                    check_all(1);
                    socket['emit']('cuoc', encode(JSON['stringify']({
                        type: _0x90f8x6['type'],
                        id: _0x90f8x6['id'],
                        key: _0x90f8x6['key'],
                        md5: _0x90f8x6['az'],
                        xu: _0x90f8x6['xu']
                    })))
                }
            }
        })
    }
});
socket['on']('time', function (_0x90f8x2) {
    set_time(JSON['parse'](decode(_0x90f8x2)))
});
socket['on']('taixiu', function (_0x90f8x2) {
    var _0x90f8x7 = JSON['parse'](decode(_0x90f8x2));
    $('#vung-taixiu')['hide']();
    kq_taixiu(_0x90f8x7, false);
    set_roll_tx(1, _0x90f8x7);
    $('#game_id_1_mini div,#ducnghia_timetaixiu')['removeClass']('showwin');
    if ($('#game-taixiu')['css']('display') == 'block') {
        return false
    };
    if (_0x90f8x7['color'] == 'xiu-wrap') {
        $('#game_id_1_mini div,#ducnghia_timetaixiu')['html']('<img src=\"/lib/img/tx/xiu_on.png\" style=\"width: 100%;height: auto;\">')
    } else {
        $('#game_id_1_mini div,#ducnghia_timetaixiu')['html']('<img src=\"/lib/img/tx/tai_on.png\" style=\"width: 100%;height: auto;\">')
    }
});

function decode(_0x90f8x9) {
    var _0x90f8x5 = '';
    _0x90f8x9 = _0x90f8x9['replace'](/ /g, '');
    for (var _0x90f8xa = 0; _0x90f8xa < _0x90f8x9['length']; _0x90f8xa += 2) {
        _0x90f8x5 += String['fromCharCode'](parseInt(_0x90f8x9['substr'](_0x90f8xa, 2), 16))
    };
    return decodeURIComponent(escape(_0x90f8x5))
}

function encode(_0x90f8x5) {
    _0x90f8x5 = unescape(encodeURIComponent(_0x90f8x5));
    var _0x90f8x9 = '';
    for (var _0x90f8xa = 0; _0x90f8xa < _0x90f8x5['length']; _0x90f8xa++) {
        _0x90f8x9 += ' ' + _0x90f8x5['charCodeAt'](_0x90f8xa).toString(16)
    };
    return _0x90f8x9
}

function dragx(_0x90f8x4, _0x90f8xd) {
    $(function () {
        var _0x90f8xe = 0;
        _0x90f8x4['draggable']({
            axis: 'x',
            start: function () {},
            drag: function () {
                _0x90f8xe++;
                if (_0x90f8xe > 7) {
                    $('.menu_game_drag')['show']();
                    _0x90f8xe = -999999
                }
            },
            stop: function () {
                $('.menu_game_drag')['hide']();
                _0x90f8xe = 0;
                var _0x90f8xf = $(this)['position']();
                if (_0x90f8xf['left'] > 0) {
                    $(this)['animate']({
                        left: '0px'
                    }, 500)
                };
                var _0x90f8x10 = $(_0x90f8xd)['length'],
                    _0x90f8x11 = 0,
                    _0x90f8xa = 0;
                for (_0x90f8xa = 0; _0x90f8xa < _0x90f8x10; _0x90f8xa++) {
                    _0x90f8x11 += $(_0x90f8xd)['eq'](_0x90f8xa)['width']()
                };
                var _0x90f8x9 = '-' + (_0x90f8x11 - _0x90f8x4['width']() + 10);
                if (_0x90f8x11 < _0x90f8x4['width']() && _0x90f8xf['left'] < 0) {
                    _0x90f8x4['animate']({
                        left: '0px'
                    }, 200)
                };
                var _0x90f8x12 = _0x90f8x11 - $(this)['width']();
                if ((_0x90f8x12 + _0x90f8xf['left']) < 0 && _0x90f8xf['left'] < 0) {
                    $(this)['animate']({
                        left: _0x90f8x9 + 'px'
                    }, 500)
                }
            }
        })
    })
}

function dragy(_0x90f8x4, _0x90f8xd) {
    $(function () {
        function _0x90f8x14(_0x90f8x15) {
            return false;
            var _0x90f8xf = _0x90f8x4['position']();
            if (_0x90f8xf['top'] > -10 && _0x90f8x15 != 1) {
                if (_0x90f8x15 > 0) {
                    return false
                };
                _0x90f8x4['animate']({
                    top: '0px'
                }, 300)
            };
            var _0x90f8x10 = $(_0x90f8xd)['length'],
                _0x90f8x11 = 0,
                _0x90f8xa = 0;
            for (_0x90f8xa = 0; _0x90f8xa < _0x90f8x10; _0x90f8xa++) {
                _0x90f8x11 += $(_0x90f8xd)['eq'](_0x90f8xa)['height']()
            };
            var _0x90f8x9 = '-' + (_0x90f8x11 - _0x90f8x4['height']() + 10);
            if (_0x90f8x11 < _0x90f8x4['height']() && _0x90f8x15 != 2) {
                if (_0x90f8x15 > 0) {
                    return false
                };
                _0x90f8x4['animate']({
                    top: '0px'
                }, 200)
            };
            if (((_0x90f8x11 - _0x90f8x4['height']()) + _0x90f8xf['top']) < 10 && _0x90f8xf['top'] < 0 && _0x90f8x15 != 2) {
                if (_0x90f8x15 > 0) {
                    return false
                };
                _0x90f8x4['animate']({
                    top: _0x90f8x9 + 'px'
                }, 300)
            };
            return true
        }
        _0x90f8x4['on']('mousewheel', function (_0x90f8x16) {
            if (_0x90f8x16['originalEvent']['wheelDelta'] / 120 > 0) {
                if (_0x90f8x14(2) == true) {
                    _0x90f8x4['css']({
                        top: _0x90f8x4['position']()['top'] + (_0x90f8x4['height']() * 0.1) + 'px'
                    })
                }
            } else {
                if (_0x90f8x14(1) == true) {
                    _0x90f8x4['css']({
                        top: _0x90f8x4['position']()['top'] - (_0x90f8x4['height']() * 0.1) + 'px'
                    })
                }
            };
            _0x90f8x16['preventDefault']()
        });
        _0x90f8x4['draggable']({
            axis: 'y',
            stop: function () {
                _0x90f8x14()
            }
        });
        _0x90f8x14('1')
    })
}

function dragz(_0x90f8x18, _0x90f8xd, _0x90f8x19) {
    $(function () {
        function _0x90f8x14(_0x90f8x18, _0x90f8xd, _0x90f8x19, _0x90f8x15) {
            var _0x90f8x1a = Number(_0x90f8x1e['css']('left')['replace']('px', ''));
            if (_0x90f8x15 == 1) {
                var _0x90f8x1b = Math['floor'](_0x90f8x1a + _0x90f8x1e['width']()) + 10
            } else {
                var _0x90f8x1b = Math['floor'](_0x90f8x1a - _0x90f8x1e['width']()) + 10
            };
            var _0x90f8x1c = Math['floor'](_0x90f8x1b / _0x90f8x1e['width']());
            var _0x90f8x1d = Math['floor'](_0x90f8x1b - _0x90f8x1e['width']());
            _0x90f8x1e['css']({
                left: _0x90f8x1c + '' + '00%'
            });
            var _0x90f8x10 = $(_0x90f8x19)['length'],
                _0x90f8x11 = 0,
                _0x90f8xa = 0;
            for (_0x90f8xa = 0; _0x90f8xa < _0x90f8x10; _0x90f8xa++) {
                _0x90f8x11 += $(_0x90f8x19)['eq'](_0x90f8xa)['width']()
            };
            if (_0x90f8x1c > -1) {
                $(_0x90f8x18 + ' .left')['hide']()
            } else {
                $(_0x90f8x18 + ' .left')['show']()
            };
            if ('-' + _0x90f8x11 > _0x90f8x1d) {
                $(_0x90f8x18 + ' .right')['hide']()
            } else {
                $(_0x90f8x18 + ' .right')['show']()
            };
            console['log'](_0x90f8x1b);
            console['log'](_0x90f8x1c);
            console['log'](_0x90f8x1b / _0x90f8x1e['width']());
            return true
        }
        var _0x90f8x4 = $(_0x90f8x18);
        var _0x90f8x1e = $(_0x90f8xd);
        $(_0x90f8x18 + ' .left')['on']('click touchstart mousedown touchend', function () {
            if (check_click($(this)) == true) {
                _0x90f8x14(_0x90f8x18, _0x90f8xd, _0x90f8x19, 1)
            }
        })['hide']();
        $(_0x90f8x18 + ' .right')['on']('click touchstart mousedown touchend', function () {
            if (check_click($(this)) == true) {
                _0x90f8x14(_0x90f8x18, _0x90f8xd, _0x90f8x19, 2)
            }
        })
    })
}

function njs(_0x90f8x4) {
    var _0x90f8x20 = String(_0x90f8x4);
    var _0x90f8x21 = _0x90f8x20['length'];
    var _0x90f8x22 = 0;
    var _0x90f8x23 = '';
    var _0x90f8xa;
    for (_0x90f8xa = _0x90f8x21 - 1; _0x90f8xa >= 0; _0x90f8xa--) {
        _0x90f8x22 += 1;
        aa = _0x90f8x20[_0x90f8xa];
        if (_0x90f8x22 % 3 == 0 && _0x90f8x22 != 0 && _0x90f8x22 != _0x90f8x21) {
            _0x90f8x23 = '.' + aa + _0x90f8x23
        } else {
            _0x90f8x23 = aa + _0x90f8x23
        }
    };
    return _0x90f8x23
}

function note_play(_0x90f8x25, _0x90f8x26, _0x90f8x11) {
    var _0x90f8x4 = Math['floor']((Math['random']() * 99999999) + 1);
    $('' + _0x90f8x25)['html']('<p class=\"note_play id' + _0x90f8x4 + '\">' + _0x90f8x26 + '</p>');
    $('.note_play.id' + _0x90f8x4)['css']({
        'color': '#' + _0x90f8x11
    })['slideDown']('slow');
    setTimeout(function () {
        $('.note_play.id' + _0x90f8x4)['animate']({
            opacity: '0.0',
            height: 'toggle'
        }, 500)['promise']()['done'](function () {
            $(this)['remove']()
        })
    }, 1500);
    return false
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function getmoney()
{
    $['ajax']({
        type: 'post',
        url: '/core/user.php',
        success: function (data) 
        {
             $('.mymoney')['html'](numberWithCommas(data));
        }
    });
}


function check_all(_0x90f8x25) {
    return false;
    $['ajax']({
        type: 'post',
        url: '/user-play',
        data: {
            user_check: true,
            check_game: _0x90f8x25
        },
        success: function (_0x90f8x5) {
            var _0x90f8x6 = JSON['parse'](_0x90f8x5);
            $('.mymoney')['html'](njs(_0x90f8x6['money']));
            $('.ketmoney')['html'](njs(_0x90f8x6['ketmoney']));
            $('.locmoney')['html'](njs(_0x90f8x6['loc']));
            $('.vipmoney')['html'](njs(_0x90f8x6['vip']));
            if (_0x90f8x6['smssend'] > 0) {
                $('#hom_thu_send')['html'](_0x90f8x6['smssend'])['show']()
            } else {
                $('#hom_thu_send')['hide']()
            };
            if (_0x90f8x25 == 1 || _0x90f8x25 == 10) {
                
            } else {
                if (_0x90f8x25 == 2) {
                    $('#khung_baucua .cuadat .item:nth-child(1) div .c-cuoc')['html'](_0x90f8x6['var1']);
                    $('#khung_baucua .cuadat .item:nth-child(2) div .c-cuoc')['html'](_0x90f8x6['var2']);
                    $('#khung_baucua .cuadat .item:nth-child(3) div .c-cuoc')['html'](_0x90f8x6['var3']);
                    $('#khung_baucua .cuadat .item:nth-child(4) div .c-cuoc')['html'](_0x90f8x6['var4']);
                    $('#khung_baucua .cuadat .item:nth-child(5) div .c-cuoc')['html'](_0x90f8x6['var5']);
                    $('#khung_baucua .cuadat .item:nth-child(6) div .c-cuoc')['html'](_0x90f8x6['var6'])
                } else {
                    if (_0x90f8x25 == 3) {
                        $('#khung_baucua .cuadat .item:nth-child(1) div .a-cuoc')['html'](_0x90f8x6['var1'])['show']();
                        $('#khung_baucua .cuadat .item:nth-child(2) div .a-cuoc')['html'](_0x90f8x6['var2'])['show']();
                        $('#khung_baucua .cuadat .item:nth-child(3) div .a-cuoc')['html'](_0x90f8x6['var3'])['show']();
                        $('#khung_baucua .cuadat .item:nth-child(4) div .a-cuoc')['html'](_0x90f8x6['var4'])['show']();
                        $('#khung_baucua .cuadat .item:nth-child(5) div .a-cuoc')['html'](_0x90f8x6['var5'])['show']();
                        $('#khung_baucua .cuadat .item:nth-child(6) div .a-cuoc')['html'](_0x90f8x6['var6'])['show']()
                    } else {
                        if (_0x90f8x25 == 8 || _0x90f8x25 == 11) {
                            $('#khung_id8 .money-red-play div')['html'](njs(_0x90f8x6['bns1']));
                            $('#khung_id8 .money-blu-play div')['html'](njs(_0x90f8x6['bns2']))
                        } else {
                            if (_0x90f8x25 == 'xocdia1') {
                                $('#khung_id10 .cuoc_khung1 .all_b')['attr']('data-txt', _0x90f8x6['xocdia'][0]);
                                $('#khung_id10 .cuoc_khung2 .all_b')['attr']('data-txt', _0x90f8x6['xocdia'][1]);
                                $('#khung_id10 .cuoc_khung3 .all_b')['attr']('data-txt', _0x90f8x6['xocdia'][2]);
                                $('#khung_id10 .cuoc_khung4 .all_b')['attr']('data-txt', _0x90f8x6['xocdia'][3]);
                                $('#khung_id10 .cuoc_khung5 .all_b')['attr']('data-txt', _0x90f8x6['xocdia'][4]);
                                $('#khung_id10 .cuoc_khung6 .all_b')['attr']('data-txt', _0x90f8x6['xocdia'][5])
                            } else {
                                if (_0x90f8x25 == 'xocdia2') {
                                    $('#khung_id10 .cuoc_khung1 .all_m')['attr']('data-txt', _0x90f8x6['xocdia'][0]);
                                    $('#khung_id10 .cuoc_khung2 .all_m')['attr']('data-txt', _0x90f8x6['xocdia'][1]);
                                    $('#khung_id10 .cuoc_khung3 .all_m')['attr']('data-txt', _0x90f8x6['xocdia'][2]);
                                    $('#khung_id10 .cuoc_khung4 .all_m')['attr']('data-txt', _0x90f8x6['xocdia'][3]);
                                    $('#khung_id10 .cuoc_khung5 .all_m')['attr']('data-txt', _0x90f8x6['xocdia'][4]);
                                    $('#khung_id10 .cuoc_khung6 .all_m')['attr']('data-txt', _0x90f8x6['xocdia'][5])
                                }
                            }
                        }
                    }
                }
            };
            if (_0x90f8x6['hoan'] > 0 && _0x90f8x25 == 10) {
                note_play('#khung-tx .move-here .note_here', 'B\u1EA1n V\u1EEBa B\u1ECB Ho\xE0n ' + njs(_0x90f8x6['hoan']), 'f5f244')
            };
            if (_0x90f8x6['hoan2'] > 0 && _0x90f8x25 == 11) {
                note_play('#khung_id8 .move-here .note_here', 'B\u1EA1n V\u1EEBa B\u1ECB Ho\xE0n ' + njs(_0x90f8x6['hoan2']), 'f5f244')
            }
        }
    });
    return false
}

function check_win(_0x90f8x25, _0x90f8x26) {
    if (_0x90f8x25 == 'tai-xiu') {
        if (_0x90f8x26 == 'tai-wrap') {
            var _0x90f8x11 = njs(Math['floor']($('.khung-tx .cuoc-tai')['html']()['replace'](/\./g, '')) * 1.95)
        } else {
            if (_0x90f8x26 == 'xiu-wrap') {
                var _0x90f8x11 = njs(Math['floor']($('.khung-tx .cuoc-xiu')['html']()['replace'](/\./g, '')) * 1.95)
            }
        };
        check_all(1);
        if (_0x90f8x11 != '0') {
            setTimeout(function () {
                note_play('#khung-tx .move-here .note_here', 'Báº¡n tháº¯ng, vĂ o lá»‹ch sá»­ Ä‘á»ƒ xem.', '04b904');
                $('.khung-tx .cuoc-xiu')['html']('0');
                $('.khung-tx .cuoc-tai')['html']('0')
            }, 2500)
        }
    };
    if (_0x90f8x25 == 'blade-soul') {
        if (_0x90f8x26 == 'red') {
            var _0x90f8x11 = njs(Math['floor']($('#khung_id8 .money-red-play div')['html']()['replace'](/\./g, '')) * 1.95)
        } else {
            if (_0x90f8x26 == 'blu') {
                var _0x90f8x11 = njs(Math['floor']($('#khung_id8 .money-blu-play div')['html']()['replace'](/\./g, '')) * 1.95)
            }
        };
        if (_0x90f8x11 != '0') {
            setTimeout(function () {
                note_play('#khung_id8 .move-here .note_here', 'Báº¡n Vá»«a Tháº¯ng ' + _0x90f8x11, '04b904')
            }, 2500)
        };
        check_all(8)
    };
    return false
}

function Load_Game(x,y,h) {
		if( khunggame[0] == 1 && khunggame[y] == 1 ){
		$('#'+y).show('fade', {} , 500 )	
		}else if( khunggame[0] == 1 ){
		
	
	    console.log(1);
		
		khunggame[y] = 1;
		$.ajax({type:'post',url:'/'+h+'/index.html', data:{
          load_game: true,	
          game_load: x,			  
        },success:function(s){		
		$('#cvs_ga').append(s);	
		$('#'+y).hide(); 
		
		
		
	 $('#'+y).show(); 
		setCookie(y, '1' , 0.1 );
		}});
		}
		}

function hideHis() {
    $('.main-his')['removeClass']('show-main');
    $('.main-his .show-main')['removeClass']('show-main')
}

function set_img(_0x90f8x4, _0x90f8x2a, _0x90f8x11) {
    _0x90f8x4 = (100 / Math['floor'](_0x90f8x2a)) * Math['floor'](_0x90f8x4);
    if (_0x90f8x11) {
        _0x90f8x4 = _0x90f8x4 + _0x90f8x11
    };
    return _0x90f8x4
}


function set_time(_0x90f8x5) {
    $("#khung_id10 .cuoc_khung1 .all_b").attr('data-txt',_0x90f8x5.cuocxd[0]);
		$("#khung_id10 .cuoc_khung2 .all_b").attr('data-txt',_0x90f8x5.cuocxd[1]);
		$("#khung_id10 .cuoc_khung3 .all_b").attr('data-txt',_0x90f8x5.cuocxd[2]);
		$("#khung_id10 .cuoc_khung4 .all_b").attr('data-txt',_0x90f8x5.cuocxd[3]);
		$("#khung_id10 .cuoc_khung5 .all_b").attr('data-txt',_0x90f8x5.cuocxd[4]);
		$("#khung_id10 .cuoc_khung6 .all_b").attr('data-txt',_0x90f8x5.cuocxd[5]);
    $("#khung_baucua .cuadat .item:nth-child(1) div .c-cuoc").html(mcccc(_0x90f8x5.var1));
    $("#khung_baucua .cuadat .item:nth-child(2) div .c-cuoc").html(mcccc(_0x90f8x5.var2));
    $("#khung_baucua .cuadat .item:nth-child(3) div .c-cuoc").html(mcccc(_0x90f8x5.var3));
    $("#khung_baucua .cuadat .item:nth-child(4) div .c-cuoc").html(mcccc(_0x90f8x5.var4));
    $("#khung_baucua .cuadat .item:nth-child(5) div .c-cuoc").html(mcccc(_0x90f8x5.var5));
    $("#khung_baucua .cuadat .item:nth-child(6) div .c-cuoc").html(mcccc(_0x90f8x5.var6));
	    $('#clphien')['html'](njs(_0x90f8x5['r']));
	/*Duc Nghia*/
	if(_0x90f8x5['b'] >=1)
	{
	    var khkrt = '<font color="green">'+_0x90f8x5['b']+'s</font>';
	}
	else
	{
	    var khkrt = '<font color="red">'+_0x90f8x5['a']+'s</font>';
	}
	$("#id_taixiu").html(khkrt);
	$("#id_baucua").html(khkrt);
	$("#id_chanle").html(khkrt);
	/*DucNghia IT*/
    $('.khung-tx .cuoc-xiu')['html'](njs(_0x90f8x5['cx']));
    $('.khung-tx .cuoc-tai')['html'](njs(_0x90f8x5['ct']))
    if (tien <= 0) {
        numanimate_2($('.khung-tx .money-tai,.game-item-2 .money-tai .middle'), _0x90f8x5['t'], 17);
        numanimate_2($('.khung-tx .money-xiu,.game-item-2 .money-xiu .middle'), _0x90f8x5['x'], 17);
        $('.khung-tx .user-tai')['html'](njs(_0x90f8x5['at']));
        $('.khung-tx .user-xiu')['html'](njs(_0x90f8x5['ax']));
        $('.khung-tx .roll-play span')['html'](_0x90f8x5['r'])
    } else {
        if (tien == 1) {
            numanimate_2($('.khung-tx .money-tai,.game-item-2 .money-tai .middle'), _0x90f8x5['t2'], 17);
            numanimate_2($('.khung-tx .money-xiu,.game-item-2 .money-xiu .middle'), _0x90f8x5['x2'], 17);
            $('.khung-tx .user-tai')['html'](njs(_0x90f8x5['at2']));
            $('.khung-tx .user-xiu')['html'](njs(_0x90f8x5['ax2']));
            $('.khung-tx .roll-play span')['html'](_0x90f8x5['r'] + ' thá»­')
        }
    };
    $('#khung_id8 .money-red-user div')['html'](njs(_0x90f8x5['bs1']));
    $('#khung_id8 .money-blu-user div')['html'](njs(_0x90f8x5['bs2']));
    $('#khung_id8 .money-red div font')['html'](njs(_0x90f8x5['abs1']));
    $('#khung_id8 .money-blu div font')['html'](njs(_0x90f8x5['abs2']));
    $('#khung_baucua .phien span')['html'](_0x90f8x5['r']);
    $('#khung_baucua .cuadat .item:nth-child(1) div .b-cuoc')['html'](_0x90f8x5['bc1']);
    $('#khung_baucua .cuadat .item:nth-child(2) div .b-cuoc')['html'](_0x90f8x5['bc2']);
    $('#khung_baucua .cuadat .item:nth-child(3) div .b-cuoc')['html'](_0x90f8x5['bc3']);
    $('#khung_baucua .cuadat .item:nth-child(4) div .b-cuoc')['html'](_0x90f8x5['bc4']);
    $('#khung_baucua .cuadat .item:nth-child(5) div .b-cuoc')['html'](_0x90f8x5['bc5']);
    $('#khung_baucua .cuadat .item:nth-child(6) div .b-cuoc')['html'](_0x90f8x5['bc6']);
    if (gid[10] == '#khung_id10 ') {
        chip_roll_id10('cuoc_khung1', _0x90f8x5['xocdia'][0]);
        chip_roll_id10('cuoc_khung2', _0x90f8x5['xocdia'][1]);
        chip_roll_id10('cuoc_khung3', _0x90f8x5['xocdia'][2]);
        chip_roll_id10('cuoc_khung4', _0x90f8x5['xocdia'][3]);
        chip_roll_id10('cuoc_khung5', _0x90f8x5['xocdia'][4]);
        chip_roll_id10('cuoc_khung6', _0x90f8x5['xocdia'][5])
    };
    capnhathured = 23 - Math['floor'](_0x90f8x5['a']);
    if (Math['floor'](_0x90f8x5['b']) > 0) {
        if (Math['floor'](_0x90f8x5['b']) > 38) {
            $('#khung_id10 .cuoc_khbox .all_s')['removeClass']('active');
            $('#khung_id10 .animation')['css']({
                'top': '0px',
                'left': '0px'
            })['addClass']('id10_laccaidia');
            $('#khung_id10 .all_chip')['remove']()
        } else {
            $('#khung_id10 .animation')['removeClass']('id10_laccaidia')['css']({
                'top': '0px',
                'left': '0px'
            })
        };
        if ($('#game-taixiu2')['hasClass']('time') == false) {
            $('#game-taixiu2')['addClass']('time')
        };
        $('#game_id_8_mini div,#game_id_2_mini div,#game_id_1_mini div, #ducnghia_timetaixiu')['html'](_0x90f8x5['b']);
        $('#khung_baucua .dia')['removeClass']('ef');
        $('#khung_baucua .active')['removeClass']('active');
        $('.clock-big')['html'](_0x90f8x5['b'])['html'](_0x90f8x5['b'])['show']();
        $('#khung_id10 .chechen')['show']();
        $('.clock img,#khung_id10 .clock-small')['hide']();
        timeclock = 0
    } else {
        if (_0x90f8x5['a'] > 16) {
            $('#game-taixiu2 .clock img')['css']({
                'opacity': 1
            })
        } else {};
        $('.clock img,#khung_id10 .clock-small')['show']();
        $('#game-taixiu2')['removeClass']('time');
        $('.clock-big')['hide']();
        $('.clock-small')['html'](_0x90f8x5['a']);
        $('#game_id_8_mini div.showwin')['html']('<font color=\"red\">' + _0x90f8x5['a'] + '</font>');
        $('#game_id_1_mini div.showwin,#ducnghia_timetaixiu')['html']('<font color=\"red\">' + _0x90f8x5['a'] + '</font>');
        $('#game_id_2_mini div')['html']('<font color=\"red\">' + _0x90f8x5['a'] + '</font>');
        if (_0x90f8x5['a'] > 5) {
            $('#game-taixiu .vung_number span')['html'](Math['floor'](_0x90f8x5['a']) - 5);
            if ($('#khung_id10 .nangame')['val']() == 1) {
                $('#khung_id10 .clock-small')['html'](Math['floor'](_0x90f8x5['a']) - 5)
            }
        } else {
            if (ketquatxvung != false) {
                kq_taixiu(ketquatxvung, true)
            };
            if (kq_xocdia && kq_xocdia != null) {
                kq_roll_id10(kq_xocdia)
            }
        };
        timeclock = Math['floor'](_0x90f8x5['a']) * 1000
    }
}

function tron_k(_0x90f8x5) {
    _0x90f8x5 = Math['floor'](_0x90f8x5);
    return njs(Math['floor'](_0x90f8x5 / 1000))
}

function setCookie(_0x90f8x32, _0x90f8x33, _0x90f8x34) {
    var _0x90f8x35 = new Date();
    if (_0x90f8x34) {
        _0x90f8x35['setTime'](_0x90f8x35['getTime']() + (_0x90f8x34 * 24 * 60 * 60 * 1000));
        document['cookie'] = _0x90f8x32 + '=' + _0x90f8x33 + ';expires=' + _0x90f8x35['toUTCString']()
    } else {
        document['cookie'] = _0x90f8x32 + '=' + _0x90f8x33 + ';expires=Fri, 30 Dec 9999 23:59:59 GMT;'
    }
}

function check_click2(_0x90f8x4) {
    if (_0x90f8x4['data']('click') != 'click') {
        _0x90f8x4['data']('click', 'click');
        setTimeout(function () {
            _0x90f8x4['removeData']('click')
        }, 100);
        return true
    };
    return false
}

function check_click(_0x90f8x4) {
    if (_0x90f8x4['data']('click') != 'click') {
        _0x90f8x4['data']('click', 'click');
        setTimeout(function () {
            _0x90f8x4['removeData']('click')
        }, 300);
        return true
    };
    return false
}
$(document)['ready'](function () {});

function numanimate(_0x90f8x4, _0x90f8x2a) {
    var _0x90f8x39 = Math['floor'](_0x90f8x4['val']());
    var _0x90f8x3a = (Math['floor'](_0x90f8x2a) - Math['floor'](_0x90f8x4['val']())) / 10;
    (function _0x90f8x2c(_0x90f8xa) {
        setTimeout(function () {
            _0x90f8x4['html'](njs(Math['floor'](_0x90f8x39 + (11 - _0x90f8xa) * _0x90f8x3a)));
            if (--_0x90f8xa) {
                _0x90f8x2c(_0x90f8xa)
            } else {
                _0x90f8x4['val'](_0x90f8x2a)
            }
        }, 30)
    })(10)
}

function numanimate_2(_0x90f8x4, _0x90f8x2a, _0x90f8x19) {
    var _0x90f8x3c = Math['floor'](_0x90f8x19);
    var _0x90f8x39 = Math['floor'](_0x90f8x4['val']());
    var _0x90f8x3a = (Math['floor'](_0x90f8x2a) - Math['floor'](_0x90f8x4['val']())) / _0x90f8x3c;
    (function _0x90f8x2c(_0x90f8xa) {
        setTimeout(function () {
            _0x90f8x4['html'](njs(Math['floor'](_0x90f8x39 + (_0x90f8x3c + 1 - _0x90f8xa) * _0x90f8x3a)));
            if (--_0x90f8xa) {
                _0x90f8x2c(_0x90f8xa)
            } else {
                _0x90f8x4['val'](_0x90f8x2a)
            }
        }, 40)
    })(_0x90f8x3c)
}

function getCookie(_0x90f8x3e) {
    var _0x90f8x3f = _0x90f8x3e + '=';
    var _0x90f8x40 = document['cookie']['split'](';');
    for (var _0x90f8xa = 0; _0x90f8xa < _0x90f8x40['length']; _0x90f8xa++) {
        var _0x90f8x11 = _0x90f8x40[_0x90f8xa];
        while (_0x90f8x11['charAt'](0) == ' ') {
            _0x90f8x11 = _0x90f8x11['substring'](1)
        };
        if (_0x90f8x11['indexOf'](_0x90f8x3f) == 0) {
            return _0x90f8x11['substring'](_0x90f8x3f['length'], _0x90f8x11['length'])
        }
    };
    return ''
}

function checkCookie(_0x90f8x3e) {
    var _0x90f8x42 = getCookie(_0x90f8x3e);
    if (_0x90f8x42 != '') {
        return true
    } else {
        return false
    }
}
$(document)['ready'](function () {
    check_all(0);
    dragz('#wesite_game_lr', '.menu-game .swiper-wrapper', '.menu-game .swiper-wrapper');
    dragy($('#lsscroll'), '#lsscroll .showhe');
    dragy($('#show_hu_number'), '#show_hu_number .body_1');
    khunggame[0] = 1;
  //  Load_Game(1,'game-taixiu','ngocrong');
   // Load_Game(10,'khung_id10','chanle');
   // Load_Game(2, 'khung_baucua', 'baucua')
   // Load_Game(5,'khung_id5','phucsinh');
});
$(document)['on']('click', 'a', function (_0x90f8x43) {
    _0x90f8x43['preventDefault']();
    var _0x90f8x44 = $(this)['attr']('href');
    var _0x90f8x14 = _0x90f8x44['split']('//');
    if(_0x90f8x44.split('#')[1])
    {
        return false;
    }
    if(_0x90f8x44.split(':')[0] == "javascript")
    {
        return false;
    }
    if (!_0x90f8x14[1]) {
        if (_0x90f8x44 != '#menu' && _0x90f8x44 != '#ducnghia' && _0x90f8x44 != '#' && _0x90f8x44 != '#home') {
            getContent(_0x90f8x44)
        }
    } else {
        getContent(_0x90f8x44)
    }
});
window['addEventListener']('popstate', function (_0x90f8x16) {
    getContent(location['pathname'], false)
});

function getContent(_0x90f8x46, _0x90f8x47) {
    loadingView = false;
    if (!_0x90f8x47) {};
    var _0x90f8x48 = new XMLHttpRequest();
    _0x90f8x48['onreadystatechange'] = function () {
        if (this['readyState'] == 4 && this['status'] == 200) {
            $('#ducnghia')['html'](this['responseText']);
            $(".preloader").fadeOut();
        }
    };
    _0x90f8x48['open']('POST', _0x90f8x46, true);
    _0x90f8x48['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    _0x90f8x48['send']('t=1&load=1');
    history['pushState']('object or string representing the state of the page', 'Xin Chao', _0x90f8x46)
    $(".preloader").show();
}

function dangky() {
    $['ajax']({
        url: '/type/send.php?reg',
        type: 'POST',
        data: $('#form_login')['find']('select, textarea, input')['serialize'](),
        success: function (_0x90f8x4a) {
            var _0x90f8x4 = $['parseJSON'](_0x90f8x4a);
            thongbao(_0x90f8x4['msg'], _0x90f8x4['type'])
        }
    })
}

function exit() {
    $['ajax']({
        url: '/type/send.php?exit',
        type: 'POST',
        data: $('#form_login')['find']('select, textarea, input')['serialize'](),
        success: function (_0x90f8x4a) {
            $('#menu_login')['html']('<a class="dropdown-item" href="/dangnhap"><i class="mdi mdi-cached mr-2 text-success"></i> \u0110\u0103ng nh\u1EADp</a><div class="dropdown-divider"></div><a class="dropdown-item" href="/dangky"><i class="mdi mdi-logout mr-2 text-primary"></i> \u0110\u0103ng k\xFD </a>');
            $('#name')['html']('Kh\xE1ch');
            $('#name2')['html']('Ch\xE0o b\u1EA1n.');
            $('#xu')['html']('');
            $('#menu_1')['show']();
            $('#menu_2')['show']();
            getContent('/dangnhap')
        }
    })
}

function chat() {
    $['ajax']({
        url: '/type/send.php?chat',
        type: 'POST',
        data: {
            chat: $('#name_chat')['val']()
        },
        success: function (_0x90f8x4) {
            if (_0x90f8x4['type'] == 'thanhcong') {
                $('#phongchat')['html'](_0x90f8x4['center'] + $('#phongchat')['html']());
                $('#name_chat')['val']('');
                socket['emit']('chat', encode(JSON['stringify']({
                    center: _0x90f8x4['center'],
                    notice: _0x90f8x4['notice']
                })))
            } else {
                thongbao(_0x90f8x4['msg'], _0x90f8x4['type'])
            }
        }
    })
}

function mcccc(a)
{
    if(+a <=999)
    {
        return a;
    }
    
    if(+a >=1000 && +a <= 999999)
    {
        return Math.floor(a/1000)+'K';
    }
    if(+a>=1000000)
    {
        return Math.floor(a/1000000)+'M';
    }
}


function doitien() {
    thongbao('Tinh nang choi thu dong tu ngay 9/1', 'thanhcong');
    return false;
    $['ajax']({
        url: '/type/send.php?tien',
        type: 'POST',
        success: function (_0x90f8x4a) {
            thongbao(_0x90f8x4a, 'thanhcong');
            if (tien >= 1) {
                tien = 0
            } else {
                tien = 1
            };
            check_all(1)
        }
    })
}

function cuoc()
{
    var so = $("#so").val();
    var tiencuoc = $("#tiencuoc").val();
    $.ajax(
        {
            url : '/type/send.php?cuocthoigian',
            type : 'POST',
            data : {tiencuoc : tiencuoc, so : so},
            success : function(result)
            {
                thongbao(result.msg,result.type);
                $('#modalVongQuay').modal('hide');
            }
        }
        );
}

function xoso()
{
    $.ajax(
        {
            url : '/type/send.php?xoso',
            type : 'POST',
            data : {},
            success : function(result)
            {
                $('#modalVongQuay').modal('show');
                $("#xoso").html(result);
            }
        }
        );
}

function uploadavatar(){
$(".preloader").show();
var formData = new FormData($('#formid')[0]);


    $.ajax({

            	       	url         : '/profile/profile.html?up',
    	            	type        : 'POST',
    	            	data        : formData,
    	            	contentType: false,
                    cache: false,
                    processData:false,
                  	success : function(result){
                    getContent('/profile/profile.html');
                  	}
    	        	});
}

function dangnhap() {
    $['ajax']({
        url: '/guest/dangnhap.html?ducnghia',
        type: 'POST',
        data: $('#form_login')['find']('select, textarea, input')['serialize'](),
        success: function (log) {
            if(log.code <=0)
            {
                $("#log_login").html(log.text);
            }
            else
            {
                window.location.replace('/index.php');
            }
            
            
            
        }
    })
}

function check_attributes(data)
{
    for(var i=0;i<data.length;i++)
    {
        if(data[i].name == "ducnghia")
        {
            return data[i].value;
        }
    }
    return false;
}

function thoigian(time)
{
    var now = Math.round(Date.now()/1000);
    var giay = +now - +time;
    if(giay <=60)
    {
        return giay+' giĂ¢y trÆ°á»›c';
    }
    
    if(giay >=60 && giay <=3600)
    {
        return Math.round(giay/60)+ ' PhĂºt trÆ°á»›c';
    }
    
    if(giay >=3600 && giay <86400)
    {
        return Math.round(giay/60/60)+ ' Giá» trÆ°á»›c';
    }
    if(giay >=86400)
    {
        return Math.round(giay/60/60/24)+ ' NgĂ y trÆ°á»›c';
    }
}

setInterval(function () {
    //check_all(1);
    /*Chat realtime*/
    
    for(var i=0;i<$(".chat-time").length;i++)
    {
        var step = check_attributes($(".chat-time")[i].attributes);
        if(step != false)
        {
            $(".chat-time")[i].textContent = thoigian(step);
        }
    }
    
    for(var i=0;i<$(".time").length;i++)
    {
        var step = check_attributes($(".time")[i].attributes);
        if(step != false)
        {
            if(step >=1)
            {
                $(".time")[i].textContent = thoigian(step);
        
            }
        }
    }
    
    /*DucNghia*/
    
}, 5000)


//  sá»­ lĂ½ dá»¯ liá»‡u socket.io


//Game Ngá»c Rá»“ng
function json(data)
{
	return encode(JSON.stringify(data));
}
//note_play('#khung-tx .move-here .note_here', _0x90f8x6['ms'], 'f5f244')
//note_play('.move-here .note_here', _0x90f8x6['ms'], _0x90f8x6['color']);
socket.on("ducnghia", function(io)
{
    
    io = JSON.parse(decode(io));
    //console.log(io);
    // Báº¦U CUA
    if(io.ducnghia == "return_baucua")
    {
        if(io.code <=0 ) 
        {
             note_play('#khung_baucua .note_here', 'Vui lĂ²ng Ä‘á»£i phiĂªn sau', 'f5f244');
             return false;
        }
        $.ajax(
            {
                url : '/baucua/data.html',
                type : 'POST',
                data : {
                    play_chon1: io.play_chon1,
                    play_chon2: io.play_chon2,
                    play_chon3: io.play_chon3,
                    play_chon4: io.play_chon4,
                    play_chon5: io.play_chon5,
                    play_chon6: io.play_chon6,
                    keycode : io.keycode,
                    phien : io.phien,
                },
                success : function(d)
                {
                    if(d.error >=1)
                    {
                        socket.emit("ducnghia",json(
                            {
                                ducnghia : 'cuoc_baucua',
                                keycode : d.keycode,
                                az : d.az,
                                id : d.id,
                                cuoc1 : d.cuoc1,
                                cuoc2 : d.cuoc2,
                                cuoc3 : d.cuoc3,
                                cuoc4 : d.cuoc4,
                                cuoc5 : d.cuoc5,
                                cuoc6 : d.cuoc6,
                                name : d.ten,
                            }));
                        note_play('#khung_baucua .note_here', d.ms, '');
                    }
                    else
                    {
                        note_play('#khung_baucua .note_here', d.ms, 'f5f244')
                    }
                }
            }
            );
        
    }
    //
    // CHáº´N Láºº
    if(io.ducnghia == "ketquachanle")
    {
        	$( "#khung_id10 .chechen" ).hide();
        	$( "#khung_id10 .dia div" ).eq(0).attr('data-txt',io.cau[1])
        	$( "#khung_id10 .dia div" ).eq(1).attr('data-txt',io.cau[2])
	        $( "#khung_id10 .dia div" ).eq(2).attr('data-txt',io.cau[3])
	        $( "#khung_id10 .dia div" ).eq(3).attr('data-txt',io.cau[4])
	        if($("#khung_id10 .nangame").val() == 1){
                kq_xocdia = io;	
            }
            else
            {
                kq_roll_id10(io);
            }
    }
    if(io.ducnghia == "checkchanle")
    {
        if(io.code <=0)
        {
            note_play('#khung_id10 .note_here','Vui lĂ²ng chá» phiĂªn tiáº¿p theo...','faaf55');
            return false;
        }
        $.ajax(
            {
                url : '/chanle/data.html',
                type : 'POST',
                data : {play_dat : io.data, keycode : io.keycode, phien : io.phien},
                success : function(d)
                {
                    if(d.error >=1)
                    {
                        note_play('#khung_id10 .note_here',d.ms,'faaf55');
                        return false;
                    }
                    socket.emit("ducnghia",json(
                        {
                            keycode : d.keycode,
                            az : d.az,
                            id : d.id,
                            data : d.c,
                            ducnghia : 'cuoc_chanle', 
                            name : d.name,
                        }
                        ));
                        GameManagerID_10.retun_money(1);
                }
            }
            );
    }
    
    //
    if(io.ducnghia == "char")
    {
        $('#vung-taixiu')['hide']();
        kq_taixiu(io, false);
        set_roll_tx(1, io);
        set_roll_bc(1,io);
        $('#game_id_1_mini div,#ducnghia_timetaixiu')['removeClass']('showwin');
        if ($('#game-taixiu')['css']('display') == 'block') {
        return false
        };
        if (io.color == 'xiu-wrap') 
        {
            $('#game_id_1_mini div,#ducnghia_timetaixiu')['html']('<img src=\"/lib/img/tx/xiu_on.png\" style=\"width: 100%;height: auto;\">')
        } else 
        {
            $('#game_id_1_mini div,#ducnghia_timetaixiu')['html']('<img src=\"/lib/img/tx/tai_on.png\" style=\"width: 100%;height: auto;\">')
        }
    }
    
    if(io.ducnghia == "realtime")
    {
        set_time(io);
    }
    
    if(io.ducnghia == "chat")
    {
        if(io.to == id)
        {
            playSFX("chat"); // Ă‚M THANH CHĂT
            //  ## Náº¾U ÄANG Báº¬T BOX CHĂT ##
            if($(".chat-windows #user-chat"+io.from).length >=1)
            {
                $(".chat-windows #user-chat" + io.from).removeClass("mini-chat").show();
                $("#list_chat_"+io.from).append('<li class="msg_receive"><div class="chat-content"><div class="box bg-light-info">'+io.text+'</div></div><div class="chat-time" ducnghia="'+io.time+'">Vá»«a song</div></li>');
                document.getElementById("list_chat_"+io.from+"").scrollIntoView({behavior: "auto", block: "end", inline: "nearest"});
            }
            else
            {
                window_chat(io.from);
            }
            
        }
    }
    /*##########BOX CHAT#########*/
    if(io.ducnghia == "chat_room")
    {
        if($("#chat").length >=1)
        {
            $( ".chat-list" ).append(io.code);
         
            playSFX("chat");
            
        }
    }
    
    /*###############################*/
    /*Game NRO*/
    if(io.ducnghia == "thongbao")
    {
        alert(io.msg);
    }
    if(io.game == "ngocrong")
    {
        if(io.code <=0)
        {
            note_play('#khung-tx .move-here .note_here', 'ÄĂ£ háº¿t thá»i gian cÆ°á»£c, xin chá» tá»›i phiĂªn sau.', 'f5f244');
            return false;
        }
        $.ajax({
            url : '/ngocrong/data.html',
            type : 'POST',
            data : {keycode : io.keycode, xu : io.xu, cuoc : io.cuoc, id : io.id},
            success : function (c)
            {
                if(c.error ==1)
                {
                    note_play('#khung-tx .move-here .note_here', c.msg, 'f5f244');
                }
                else
                {
                    note_play('.move-here .note_here', c.msg, 'f5f244');
                    socket.emit("ducnghia",json({
                        ducnghia : 'cuoc_ngocrong',
                        xu       : c.xu,
                        keycode : c.keycode,
                        az     : c.az,
                        cuoc : c.cuoc,
                        uid : c.uid,
                        taikhoan : c.taikhoan,
                        ten : c.ten
                    }));
                }
            }
        });
    }
    
}
);


//  CHĂT ###############
var effectResources = new Array();
var EffectResourceTotalCount = 0;
function loadedEffectResource() {
    EffectResourceLoadedCount++;
}
var EffectResourceLoadedCount = 0;

function ResourceEffect(src,key) 
{
	this.audio = new Audio();
	this.audio.src = src;
	this.audio.oncanplaythrough = loadedEffectResource;
	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
	{
		this.audio.load();
	}
	this.audio.volume = 0.5;
	this.key = key;
	EffectResourceTotalCount++;
	return this;
}
function effectResourceByKey(key) 
{
	for(var i=0;i<effectResources.length;i++) {
		if( effectResources[i].key == key)
			return effectResources[i].audio;
		}
	return null;
}
function playSFX(key) {
			
    var audio = effectResourceByKey(key);
	if( audio ) 
	{
		audio.play();
	}
}
	
effectResources.push(new ResourceEffect("/lib/chat.wav","chat"));

function chat_chung()
{
    var noidung = $("#noidung_chung").val();
    $.ajax(
        {
            url : '/chat/websocket.html',
            type : 'POST',
            data : {noidung : noidung},
            success : function(d)
            {
                if(d.error ==1)
                {
                    alert(d.msg);
                }
                else
                {
                    $( ".chat-list" ).append(d.profile);
                    socket.emit("ducnghia",json({ducnghia : 'chat_room', code : d.ws}));
                    $("#noidung_chung").val('');
                  
                }
            }
        });
}
function send_sms(id)
{
    var text = $("#input_"+id).val();
    if(text.length <=0)
    {
        return false;
    }
    $.ajax(
        {
            url : '/chat/io.html',
            type: 'POST',
            data: {id : id, text : text},
            success : function(d)
            {
                if(d.error >=1)
                {
                    alert(d.msg);
                    return false;
                }
                $("#list_chat_"+d.to).append('<li class="odd msg_sent"><div class="chat-content"><div class="box bg-light-info">'+d.text+'</div><br></div><div class="chat-time" ducnghia="'+d.thoigian+'">Vá»«a song</div></li>');
                document.getElementById("list_chat_"+d.to+"").scrollIntoView({behavior: "auto", block: "end", inline: "nearest"});
                
                /*Socket. IO*/
                socket.emit("ducnghia",json({
                    ducnghia : 'chat',
                    to : d.to,
                    time : d.thoigian,
                    from : d.from,
                    name : d.name,
                    text : d.text
                }));
            }
        });
}
function window_chat(id)
{
    if($(".chat-windows #user-chat"+id).length >=1) //náº¿u Ä‘Ă£ cĂ³ khung chĂ¡t nĂ y...
    {
        $(".chat-windows #user-chat" + id).removeClass("mini-chat").show();
        document.getElementById("list_chat_"+id+"").scrollIntoView({behavior: "auto", block: "end", inline: "nearest"});
        return false;
    }
    $.ajax(
        {
            url : '/chat/sms.html',
            type : 'POST',
            data : {id : id},
            success : function(d)
            {
                if(d.error >=1)
                {
                    alert(d.msg);
                    return false;
                }
                var a = d.nick.name; // name
                    e = d.nick.avatar; // avatar
                    t = d.nick.id; // id
                    i = d.nick.online; //sattus online
                $(".chat-windows #user-chat" + t).removeClass("mini-chat").show();
                var s = '';
                var list = '';
                for(var s2=0;s2<d.danhsach.length;s2++)
                {
                    //$(".chat-time")[1].textContent = '123'
                    list+=d.danhsach[s2].text;
                }
                s+="<div class='user-chat' id='user-chat" + t + "' data-user-id='" + t + "'>"; /*Form*/
                
                s += "<div class='chat-head'><img src='" + e + "' data-user-id='" + t + "'><span class='status " + i + "'></span><span class='name'>" + a + "</span><span class='opts'><i class='ti-close closeit' data-user-id='" + t + "'></i><i class='ti-minus mini-chat' data-user-id='" + t + "'></i></span></div>"; /*Head*/
                
                s += "<div class='chat-body'><ul class='chat-list' id='list_chat_"+t+"'>"+list+"</ul></div>"; /*Center*/
                
                s += "<div class='chat-footer'><input type='text' id='input_"+t+"' placeholder='nháº­p ná»™i dung' class='form-control' onkeydown = 'if (event.keyCode == 13) send_sms("+t+")'></div>"; /*Foot*/
                
                
                s += "</div>"; /*End Form*/
                
                $(".chat-windows").append(s); // insert
                document.getElementById("list_chat_"+t+"").scrollIntoView({behavior: "auto", block: "end", inline: "nearest"});
                /*Form DucNghia*/
                
            }
        });
}


function list_chat()
{
    $.ajax(
        {
            url  : '/chat/list.html',
            success : function(d)
            {
                if(d.error >=1)
                {
                    alert(d.msg);
                    return false;
                }
                var html = '<li><div class="drop-title text-white bg-danger"><h4 class="m-b-0 m-t-5">'+d.total+' tin nháº¯n má»›i</h4><span class="font-light">Tin nháº¯n</span></div> </li>';
                html+='<li><div class="message-center message-body ps-container ps-theme-default ps-active-y" data-ps-id="f59928ba-229f-0d18-5dcb-a045bc55ae65">';
                for(var i=0;i<d.chat.length;i++)
                {
                    var c = d.chat[i];
                    html+='<a onclick="window_chat('+c.id+')" href="javascript:void(0)" class="message-item" '+(c.cout >=1 ? 'style="background-color: #dee2e6;"' : '')+'><span class="user-img"> <img src="'+c.avatar+'" alt="user" class="rounded-circle"> <span class="profile-status '+c.online+' pull-right"></span> </span><div class="mail-contnet"><h5 class="message-title">'+c.name+'</h5> <span class="mail-desc">'+c.text+'</span> <span class="time" ducnghia="'+c.time+'"></span> </div></a>';
                    
                }
                html+='<div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;"><div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div class="ps-scrollbar-y-rail" style="top: 0px; right: 3px; height: 317px;"><div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 293px;"></div></div></div>';
                html+='</li></div>';
                $("#result_msg").html(html);
            }
        }
        );
}




  var upimg = 0;
$(document).on('click',function(event){
    
     var button = event.target;
 var ducnghia_n = button.id;
if(ducnghia_n =="msg"  || ducnghia_n == "autoztextarea" || event.target.name == "msg") {
    upimg =1;
} else {
    upimg=0;
}
 
});
function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
}
var dangpload = 0;
function appendFileAndSubmit(getf){
    if(upimg !=1) {
        return false;
    }
    
    if(dangpload >=1) {
        $("#thongbao").html('Äang upload áº£nh xin chá»...');
        return false;
    }
    dangpload=1;

        var ImageURL = getf;

        $("#thongbao").html('Äang upload áº£nh...');
        $.ajax({
            url:"/true/coppy.html",
            data: {img : ImageURL},
            type:"POST",
            
            success:function(n){
              if(n.error == "true") {
  
          $("#thongbao").html('Uload tháº¥t báº¡i, vui lĂ²ng thá»­ láº¡i.');

} else {
$("#thongbao").html('Upload thĂ nh cĂ´ng. <br> <code>URL : <font color="red">'+n.url+'</font> <img src="'+n.url+'"></code>');
console.log(n);
} 
               
     dangpload=0;
            }
           
        });
    }



document.onpaste = function(event){
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                var blob = item.getAsFile();
                var reader = new FileReader();
                reader.onload = function(event) {
                    appendFileAndSubmit(event.target.result);
                };
                reader.readAsDataURL(blob);
            }
        }
    } 


function upanh1(){
            $("#thongbao").html('dag up... xin cho');


 var formData = new FormData($('#formid')[0]);


    $.ajax({

            	       	url         : '/true/img.html',
    	            	type        : 'POST',
    	            	data        : formData,
    	            	contentType: false,
                    cache: false,
                    processData:false,
                  	success : function(result){
                    $('#uploadf').html('Upload');

 var n = $.parseJSON(result);
if(n.error == "true") {
  
          $("#thongbao").html('that bai');

} else {
$('#formid').each(function(){
    this.reset();
});
      $("#thongbao").html('Upload thĂ nh cĂ´ng. <br> <code>URL : <font color="red">'+n.url+'</font> <img src="'+n.url+'"></code>');
}

    	            	}
    	        	});
}


function outgame()
{
    $.ajax({
        url : '/true/out.html',
        type : 'GET',
        success : function(d)
        {
            window.location.replace('/index.php');
        }
        });
}
setInterval(function(){getmoney()},5000);


