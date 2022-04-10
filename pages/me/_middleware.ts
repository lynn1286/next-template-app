import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// NextResponse 在中间件中提供了四种方法。
// - redirect()：redirect 方法将请求从一条路由重定向到另一条路由。
// - rewrite()：重写你的退出响应。
// - next()：next 方法将中间件链从一个中间件延续到另一个中间件。
// - json(): json 方法返回 JSON 响应或数据

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.cookies) {
    return NextResponse.next()
  }

  return NextResponse.redirect('/login')
}
