// import Image from 'next/image'

import BLOG from '@/blog.config'
import { ArrowSmallRight, PlusSmall } from '@/components/HeroIcons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useImperativeHandle, useRef, useState } from 'react'
import CONFIG from '../config'

/**
 * 顶部英雄区
 * 左右布局，
 * 左侧：banner组
 * 右侧：今日卡牌遮罩
 * @returns
 */
const Hero = props => {
  return (
        <div id="hero-wrapper" className='recent-top-post-group w-full overflow-hidden select-none px-5 mb-4'>
            <hero id="hero" style={{ zIndex: 1 }} className="recent-post-top rounded-[12px] 2xl:px-5 recent-top-post-group max-w-[86rem] overflow-x-scroll w-full mx-auto flex-row flex-nowrap flex relative space-x-3" >
                {/* 左侧banner组 */}
                <BannerGroup {...props} />

                {/* 右侧置顶文章组 */}
                <TopGroup {...props} />
            </hero>
        </div>
  )
}

/**
 * 英雄区左侧banner组
 * @returns
 */
function BannerGroup(props) {
  return (
        // 左侧英雄区
        <div id='bannerGroup' className='flex flex-col justify-between flex-1 mr-2 max-w-[42rem]'>
            {/* 动图 */}
            <Banner {...props} />
            {/* 导航分类 */}
            <GroupMenu />
        </div>
  )
}

/**
 * 英雄区左上角banner动图
 * @returns
 */
function Banner(props) {
  const router = useRouter()
  const { latestPosts } = props
  // 跳转到任意文章
  function handleClickBanner() {
    const randomIndex = Math.floor(Math.random() * latestPosts.length)
    const randomPost = latestPosts[randomIndex]
    router.push(randomPost.slug)
  }

  return <div id='banners' onClick={handleClickBanner} className="group h-full bg-white rounded-xl border mb-3 relative hidden xl:flex xl:flex-col overflow-hidden">

        <div id='banner-title' className='flex flex-col absolute top-10 left-10'>
            <div className='text-4xl font-bold mb-3'>分享编程<br />与思维认知</div>
            <div className='text-xs text-gray-600'>TANGLY1024.COM</div>
        </div>

        {/* 斜向滚动的图标 */}
        <TagsGroupBar />

        {/* 遮罩 */}
        <div id='banner-cover' style={{ backdropFilter: 'blur(15px)' }} className={'opacity-0 group-hover:opacity-100 duration-300 transition-all bg-[#4259efdd] cursor-pointer absolute w-full h-full top-0 flex justify-start items-center'}>
            <div className='ml-12 -translate-x-32 group-hover:translate-x-0 duration-300 transition-all ease-in'>
                <div className='text-7xl text-white font-extrabold'>随便逛逛</div>
                <div className='-ml-3 text-gray-300'><ArrowSmallRight className={'w-24 h-24 stroke-2'} /></div>
            </div>
        </div>

    </div>
}

/**
 * 图标滚动标签组
 * 英雄区左上角banner条中斜向滚动的图标
 */
function TagsGroupBar() {
  const groupIcons = CONFIG.GROUP_ICONS.concat(CONFIG.GROUP_ICONS)
  return (
        <div className="tags-group-all flex -rotate-[30deg]">
            <div className="tags-group-wrapper flex flex-nowrap absolute top-16">
                {groupIcons?.map(g => {
                  return (<>
                        <div className="tags-group-icon-pair ml-6 select-none">
                            <div style={{ background: g.color_1 }} className={'tags-group-icon w-28 h-28 rounded-3xl flex items-center justify-center text-white text-lg font-bold shadow-md'}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={g.img_1} title={g.title_1} className='w-2/3' />
                            </div>
                            <div style={{ background: g.color_2 }} className={'tags-group-icon  mt-5 w-28 h-28 rounded-3xl flex items-center justify-center text-white text-lg font-bold shadow-md'}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={g.img_2} title={g.title_2} className='w-2/3' />
                            </div>
                        </div>
                    </>)
                })}
            </div>
        </div>
  )
}

/**
 * 英雄区左下角3个分类按钮
 * @returns
 */
function GroupMenu() {
  return (
        <div className="h-[165px] select-none  xl:h-20 flex flex-col w-48 justify-between xl:space-y-0 xl:flex-row xl:w-full xl:flex-nowrap xl:space-x-3">
            <Link href="/tag/必看精选" className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-400 flex h-20 justify-start items-center text-white rounded-xl xl:hover:w-1/2 xl:w-1/3 transition-all duration-500 ease-in">
                <div className="font-bold text-lg pl-5 relative -mt-2">
                    必看精选
                    <span className="absolute -bottom-0.5 left-5 w-5 h-0.5 bg-white rounded-full"></span>
                </div>
                <div className='absolute right-6  duration-700 ease-in-out transition-all scale-[2] translate-y-6 rotate-12 opacity-20 group-hover:opacity-80 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0'>
                    <i class="fa-solid fa-star text-4xl"></i>
                </div>
            </Link>
            <Link href="/tag/热门文章" className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-yellow-500 flex h-20 justify-start items-center text-white rounded-xl xl:hover:w-1/2 xl:w-1/3 transition-all duration-500 ease-in">
                <div className="font-bold text-lg pl-5 relative -mt-2">
                    热门文章
                    <span className="absolute -bottom-0.5 left-5 w-5 h-0.5 bg-white rounded-full"></span>
                </div>
                <div className='absolute right-6  duration-700 ease-in-out transition-all scale-[2] translate-y-6 rotate-12 opacity-20 group-hover:opacity-80 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0'>
                    <i class="fa-solid fa-fire-flame-curved text-4xl"></i>
                </div>
            </Link>
            {/* 第三个标签在小屏上不显示 */}
            <Link href="/tag/实用教程" className="group relative overflow-hidden bg-gradient-to-r from-teal-300 to-cyan-300 hidden h-20 xl:flex justify-start items-center text-white rounded-xl xl:hover:w-1/2 xl:w-1/3 transition-all duration-500 ease-in">
                <div className="font-bold text-lg pl-5 relative -mt-2">
                    实用教程
                    <span className="absolute -bottom-0.5 left-5 w-5 h-0.5 bg-white rounded-full"></span>
                </div>
                <div className='absolute right-6 duration-700 ease-in-out transition-all scale-[2] translate-y-6 rotate-12 opacity-20 group-hover:opacity-80 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0'>
                    <i class="fa-solid fa-book-bookmark text-4xl "></i>
                </div>

            </Link>
        </div>
  )
}

/**
 * 置顶文章区域
 */
function TopGroup(props) {
  const { latestPosts, siteInfo } = props
  const todayCardRef = useRef()
  function handleMouseLeave() {
    todayCardRef.current.coverUp()
  }
  return (
        <div id='hero-right-wrapper' onMouseLeave={handleMouseLeave} className='flex-1 relative w-full'>
            {/* 制定最新文章 */}
            <div id='top-group' className='w-full flex space-x-3 xl:space-x-0 xl:grid xl:grid-cols-3 xl:gap-3'>
                {latestPosts?.map(p => {
                  return <Link href={`${BLOG.SUB_PATH}/${p?.slug}`} key={p.id}>
                        <div className='cursor-pointer h-[164px] group relative flex flex-col w-52 xl:w-full overflow-hidden shadow bg-white rounded-xl'>
                            {/* eslint-disable-next-line */}
                            <img className='h-24 object-cover' src={p?.pageCoverThumbnail || siteInfo?.pageCover} />
                            <div className='group-hover:text-indigo-600 line-clamp-2 overflow-hidden m-2 font-semibold'>{p?.title}</div>
                            <div className='opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 duration-200 transition-all absolute -top-2 -left-2 bg-indigo-600 text-white rounded-xl overflow-hidden pr-2 pb-2 pl-4 pt-4 text-xs'>荐</div>
                        </div>
                    </Link>
                })}
            </div>
            <TodayCard cRef={todayCardRef} />
        </div>
  )
}

/**
 * 英雄区右侧，今日卡牌
 * @returns
 */
function TodayCard({ cRef }) {
  const router = useRouter()
  // 卡牌是否盖住下层
  const [isCoverUp, setIsCoverUp] = useState(true)

  /**
                   * 外部可以调用此方法
                   */
  useImperativeHandle(cRef, () => {
    return {
      coverUp: () => {
        setIsCoverUp(true)
      }
    }
  })

  /**
                   * 点击更多
                   * @param {*} e
                   */
  function handleClickMore(e) {
    e.stopPropagation()
    setIsCoverUp(false)
  }

  /**
                 * 点击卡片跳转的链接
                 * @param {*} e
                 */
  function handleCardClick(e) {
    router.push('https://tangly1024.com')
  }

  return <div id='today-card' className={`${isCoverUp ? ' ' : 'pointer-events-none'} overflow-hidden absolute hidden xl:flex flex-1 flex-col h-full top-0 w-full`}>
        <div id='card-body' onClick={handleCardClick} className={`${isCoverUp ? 'opacity-100 cursor-pointer' : 'opacity-0 transform scale-110 pointer-events-none'} shadow transition-all duration-200 today-card h-full bg-[#0E57D5] rounded-xl relative overflow-hidden flex items-end`}>
            <div id='today-card-info' className='z-10 flex justify-between w-full relative text-white p-10 items-end'>
                <div className='flex flex-col'>
                    <div className='text-xs font-light'>新版上线</div>
                    <div className='text-3xl font-bold'>NotionNext4.0 轻松定制主题</div>
                </div>
                <div onClick={handleClickMore} className={`'${isCoverUp ? '' : 'hidden pointer-events-none '} flex items-center px-3 h-10 justify-center bg-[#425aef] hover:bg-[#4259efcb] transition-colors duration-100 rounded-3xl`}>
                    <PlusSmall className={'w-6 h-6 mr-2 bg-white rounded-full stroke-indigo-400'} />
                    <div id='more' className='select-none'>更多推荐</div>
                </div>
            </div>
            <div id='today-card-cover' className={`${isCoverUp ? '' : ' pointer-events-none'} cursor-pointer today-card-cover absolute w-full h-full top-0`} style={{ background: "url('https://bu.dusays.com/2023/03/12/640dcd3a1b146.png') no-repeat center /cover" }}></div>
        </div>
    </div>
}

export default Hero
