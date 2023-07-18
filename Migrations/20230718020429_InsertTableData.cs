using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TestApi.Migrations
{
    /// <inheritdoc />
    public partial class InsertTableData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Comments",
                table: "Comments");

            migrationBuilder.RenameTable(
                name: "Comments",
                newName: "Comentarios");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Comentarios",
                table: "Comentarios",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Comentarios",
                columns: new[] { "Id", "Author", "CreatedAt", "Description", "Title" },
                values: new object[,]
                {
                    { 1, "Javier Garduño", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Tkhaskhkhsk", "Test" },
                    { 2, "María Rojo", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Testsss", "Test" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Comentarios",
                table: "Comentarios");

            migrationBuilder.DeleteData(
                table: "Comentarios",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Comentarios",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.RenameTable(
                name: "Comentarios",
                newName: "Comments");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Comments",
                table: "Comments",
                column: "Id");
        }
    }
}
