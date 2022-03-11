import User from "../models/user.model"
import db from "../ds"
import DatabaseError from '../../src/models/error/database.error.model'
class UserRepository{

    async findAllUsers(): Promise<User[]> {
           const sql =`
            SELECT username,passsword
            FROM aplicantion_user        
        `;
       const {rows} = await  db.query<User>(sql)
        return rows || []
    }

    async findById(uuid:string): Promise<User> {
    
            const sql =`
                SELECT username,passsword
                FROM aplicantion_user 
                WHERE uuid = $1      
            `;
            const values = [uuid];
            const {rows} = await db.query<User>(sql,values);
            const [user] =rows
            return user
        
    
    }

    async create(user:User): Promise<String> {
           const sql =`
            INSERT INTO aplicantion_user (
                username,passsword
            ) 
            VALUES ($2,crypt('$2','my_salt'))     
            
        `;
        const values = [user.username, user.password];
        const {rows} = await db.query<{uuid:string}>(sql,values);
        const [newuser] =rows
        return newuser.uuid
    }

    async update(user:User): Promise<void> {
        try {
            const sql =`
            UPDATE aplicantion_user 
            SET 
            username = $1,
            passsword = crypt('$2','my_salt')
            WHERE
            uuid = $3
        `;
        const values = [user.username, user.password, user.uuid];
        await db.query<{uuid:string}>(sql,values);
        } catch (error) {
            new DatabaseError('Erro interno')
        }
      
    }

    async remove(user:User): Promise<void> {
           const sql =`
           DELETE
           FROM
           aplicantion_user 
            WHERE
            uuid = $1
        `;
        const values = [user.username];
        await db.query<{uuid:string}>(sql,values);
    }

    async findByNameAndPassword(username:string, passsword:string): Promise<User|null> {
           try {
            const sql =`
            SELECT uuid,username
            FROM
            aplicantion_user 
             WHERE
             username = $1 AND
             passsword = crypt('$2','my_salt')
          `;
         const values = [username,passsword];
         const {rows} = await db.query<User>(sql,values)
         const [user] = rows
         return !user?null:user
           } catch (error) {
               throw new DatabaseError("Erro na consulta de password")
           }
    
    }
}

export default new UserRepository()