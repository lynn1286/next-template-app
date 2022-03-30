```
next-template-app                                        //
├─ .commitlintrc.js                                      //   commitlint 配置文件
├─ .eslintrc.json                                        //   eslint 配置文件
├─ .husky                                                //   husky
│  ├─ _                                                  //
│  │  └─ husky.sh                                        //
│  ├─ commit-msg                                         //
│  └─ pre-commit                                         //
├─ .next                                                 //   next 打包后的文件
│  ├─ build-manifest.json                                //
│  ├─ cache                                              //
│  │  └─ webpack                                         //
│  │     ├─ client-development                           //
│  │     │  ├─ 0.pack                                    //
│  │     │  ├─ 1.pack                                    //
│  │     │  ├─ 10.pack                                   //
│  │     │  ├─ 2.pack                                    //
│  │     │  ├─ 3.pack                                    //
│  │     │  ├─ 4.pack                                    //
│  │     │  ├─ 5.pack                                    //
│  │     │  ├─ 6.pack                                    //
│  │     │  ├─ 7.pack                                    //
│  │     │  ├─ 8.pack                                    //
│  │     │  ├─ 9.pack                                    //
│  │     │  ├─ index.pack                                //
│  │     │  └─ index.pack.old                            //
│  │     └─ server-development                           //
│  │        ├─ 0.pack                                    //
│  │        ├─ 1.pack                                    //
│  │        ├─ 2.pack                                    //
│  │        ├─ 3.pack                                    //
│  │        ├─ 4.pack                                    //
│  │        ├─ 5.pack                                    //
│  │        ├─ 6.pack                                    //
│  │        ├─ 7.pack                                    //
│  │        ├─ index.pack                                //
│  │        └─ index.pack.old                            //
│  ├─ package.json                                       //
│  ├─ react-loadable-manifest.json                       //
│  ├─ server                                             //
│  │  ├─ middleware-manifest.json                        //
│  │  ├─ pages                                           //
│  │  │  ├─ _app.js                                      //
│  │  │  ├─ _document.js                                 //
│  │  │  ├─ _error.js                                    //
│  │  │  ├─ api                                          //
│  │  │  │  └─ auth                                      //
│  │  │  │     └─ [...nextauth].js                       //
│  │  │  └─ index.js                                     //
│  │  ├─ pages-manifest.json                             //
│  │  ├─ webpack-api-runtime.js                          //
│  │  └─ webpack-runtime.js                              //
│  ├─ static                                             //
│  │  ├─ chunks                                          //
│  │  │  ├─ amp.js                                       //
│  │  │  ├─ main.js                                      //
│  │  │  ├─ pages                                        //
│  │  │  │  ├─ _app.js                                   //
│  │  │  │  ├─ _error.js                                 //
│  │  │  │  └─ index.js                                  //
│  │  │  ├─ polyfills.js                                 //
│  │  │  ├─ react-refresh.js                             //
│  │  │  └─ webpack.js                                   //
│  │  ├─ development                                     //
│  │  │  ├─ _buildManifest.js                            //
│  │  │  ├─ _middlewareManifest.js                       //
│  │  │  └─ _ssgManifest.js                              //
│  │  └─ webpack                                         //
│  │     ├─ 2e79b3b0f0af529f.webpack.hot-update.json     //
│  │     ├─ fa58d7fdc7931cd0.webpack.hot-update.json     //
│  │     ├─ pages                                        //
│  │     │  └─ index.2e79b3b0f0af529f.hot-update.js      //
│  │     ├─ webpack.2e79b3b0f0af529f.hot-update.js       //
│  │     └─ webpack.fa58d7fdc7931cd0.hot-update.js       //
│  └─ trace                                              //
├─ .prettierrc.json                                      //
├─ .vscode                                               //
│  └─ settings.json                                      //
├─ README.md                                             //
├─ components                                            //
│  ├─ access-denied.tsx                                  //
│  ├─ demo.tsx                                           //
│  ├─ footer.module.css                                  //
│  ├─ footer.tsx                                         //
│  ├─ header.module.css                                  //
│  ├─ header.tsx                                         //
│  ├─ icon                                               //
│  │  ├─ index.tsx                                       //
│  │  └─ style.module.less                               //
│  └─ layout.tsx                                         //
├─ lib                                                   //
│  ├─ axios.ts                                           //
│  └─ retryAdapter.ts                                    //
├─ lint-staged.config.js                                 //
├─ next-env.d.ts                                         //
├─ next.config.js                                        //
├─ package-lock.json                                     //
├─ package.json                                          //
├─ pages                                                 //   页面
│  ├─ _app.tsx                                           //
│  ├─ admin                                              //
│  │  ├─ _middleware.ts                                  //
│  │  └─ index.tsx                                       //
│  ├─ api                                                //
│  │  ├─ auth                                            //
│  │  │  └─ [...nextauth].ts                             //
│  │  └─ examples                                        //
│  │     ├─ jwt.ts                                       //
│  │     ├─ protected.ts                                 //
│  │     └─ session.ts                                   //
│  ├─ api-example.tsx                                    //
│  ├─ client.tsx                                         //
│  ├─ index.tsx                                          //
│  ├─ me                                                 //
│  │  ├─ _middleware.ts                                  //
│  │  └─ index.tsx                                       //
│  ├─ policy.tsx                                         //
│  ├─ protected.tsx                                      //
│  └─ server.tsx                                         //
├─ postcss.config.js                                     //
├─ public                                                //
│  ├─ favicon.ico                                        //
│  └─ vercel.svg                                         //
├─ stylelint.config.js                                   //
├─ styles                                                //
│  ├─ antd.less                                          //
│  ├─ globals.css                                        //
│  └─ login.module.less                                  //
├─ tailwind.config.js                                    //
├─ tsconfig.json                                         //
├─ types                                                 //
│  ├─ global.d.ts                                        //
│  ├─ next-auth.d.ts                                     //
│  └─ process.d.ts                                       //
├─ utils                                                 //
└─ yarn.lock                                             //

```
