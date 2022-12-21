import { Body, Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { createUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
    @Get()
    getUsers(@Query('sortAsc', ParseBoolPipe) sortAsc: boolean){
      console.log(sortAsc);
      return {message: "The user module"}
    }

    @Get('posts')
    getUsersPosts(){
        return [{username: "puja", posts:[
          {id:1, name:"dog"},
          {id:2, name:"rabbit"}
      ]
      }]
    }

  @Get('posts/comments')
  getUsersPostsComments(){
    return [{username:"puja",postID: 1, comments:[ "looking cute", "best pet"]}]
  }

  @Get(':id/:postId')
  getUserById(@Param('id', ParseIntPipe) id: number, @Param('postId') postId: string){
   console.log(id, postId);
   return {id, postId};
  }

  @Post('addUsers')
  createUser(@Req() req: Request, @Res() res: Response){
    console.log(req.body);
    return res.json(req.body)
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createPost(@Body() userData: createUserDto){
     console.log(userData);
     return {};
  }

}
